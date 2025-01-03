# Introduction

SAH was born with the intention of facilitating the rollbacks of functions in serverless projects,
making use of the aliases in associated projects we can perform a rollback in a much faster way,
without the need to redeploy using a stack.

::: tip Alias
A Lambda alias is a pointer to a function version that you can update.
When you deploy a new version, you can update the alias to use the new version, or split traffic between two versions.
See [Create an alias for a Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html)
:::

Let's review how it works with the current serverless framework flow, with a basic configuration we can have a running function.

```yml
service: aws-python-rest-api

frameworkVersion: '3'

provider:
  name: aws
  runtime: python3.8

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /
          method: get
```

In AWS Cloudformation we would have the following stack:

::: details CloudFormationTemplate
```yml
AWSTemplateFormatVersion: '2010-09-09'
Description: The AWS CloudFormation template for this Serverless application
Resources:
  ServerlessDeploymentBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketEncryption:
        ServerSideEncryptionConfiguration:
        - ServerSideEncryptionByDefault:
            SSEAlgorithm: AES256
  ServerlessDeploymentBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket:
        Ref: ServerlessDeploymentBucket
      PolicyDocument:
        Statement:
        - Action: s3:*
          Effect: Deny
          Principal: "*"
          Resource:
          - Fn::Join:
            - ''
            - - 'arn:'
              - Ref: AWS::Partition
              - ":s3:::"
              - Ref: ServerlessDeploymentBucket
              - "/*"
          - Fn::Join:
            - ''
            - - 'arn:'
              - Ref: AWS::Partition
              - ":s3:::"
              - Ref: ServerlessDeploymentBucket
          Condition:
            Bool:
              aws:SecureTransport: false
  HelloLogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: "/aws/lambda/aws-python-rest-api-dev-hello"
  IamRoleLambdaExecution:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
        - Effect: Allow
          Principal:
            Service:
            - lambda.amazonaws.com
          Action:
          - sts:AssumeRole
      Policies:
      - PolicyName:
          Fn::Join:
          - "-"
          - - aws-python-rest-api
            - dev
            - lambda
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
          - Effect: Allow
            Action:
            - logs:CreateLogStream
            - logs:CreateLogGroup
            - logs:TagResource
            Resource:
            - Fn::Sub: arn:${AWS::Partition}:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/aws-python-rest-api-dev*:*
          - Effect: Allow
            Action:
            - logs:PutLogEvents
            Resource:
            - Fn::Sub: arn:${AWS::Partition}:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/aws-python-rest-api-dev*:*:*
      Path: "/"
      RoleName:
        Fn::Join:
        - "-"
        - - aws-python-rest-api
          - dev
          - Ref: AWS::Region
          - lambdaRole
  HelloLambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      Code:
        S3Bucket:
          Ref: ServerlessDeploymentBucket
        S3Key: serverless/aws-python-rest-api/dev/1727612825604-2024-09-29T12:27:05.604Z/aws-python-rest-api.zip
      Handler: handler.hello
      Runtime: python3.8
      FunctionName: aws-python-rest-api-dev-hello
      MemorySize: 1024
      Timeout: 6
      Role:
        Fn::GetAtt:
        - IamRoleLambdaExecution
        - Arn
    DependsOn:
    - HelloLogGroup
  HelloLambdaVersionP8UAvh48AIJQ7pb2vPXamLWuIzfvJ5UVnkjBIee8CU:
    Type: AWS::Lambda::Version
    DeletionPolicy: Retain
    Properties:
      FunctionName:
        Ref: HelloLambdaFunction
      CodeSha256: Cow3ahBjOjSbQ8EHUWOZIzOk6f4Sf50opPeYFGX4J4M=
  ApiGatewayRestApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: dev-aws-python-rest-api
      EndpointConfiguration:
        Types:
        - EDGE
      Policy: ''
  ApiGatewayMethodGet:
    Type: AWS::ApiGateway::Method
    Properties:
      HttpMethod: GET
      RequestParameters: {}
      ResourceId:
        Fn::GetAtt:
        - ApiGatewayRestApi
        - RootResourceId
      RestApiId:
        Ref: ApiGatewayRestApi
      ApiKeyRequired: false
      AuthorizationType: NONE
      Integration:
        IntegrationHttpMethod: POST
        Type: AWS_PROXY
        Uri:
          Fn::Join:
          - ''
          - - 'arn:'
            - Ref: AWS::Partition
            - ":apigateway:"
            - Ref: AWS::Region
            - ":lambda:path/2015-03-31/functions/"
            - Fn::GetAtt:
              - HelloLambdaFunction
              - Arn
            - "/invocations"
      MethodResponses: []
    DependsOn:
    - HelloLambdaPermissionApiGateway
  ApiGatewayDeployment1727612823481:
    Type: AWS::ApiGateway::Deployment
    Properties:
      RestApiId:
        Ref: ApiGatewayRestApi
      StageName: dev
    DependsOn:
    - ApiGatewayMethodGet
  HelloLambdaPermissionApiGateway:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName:
        Fn::GetAtt:
        - HelloLambdaFunction
        - Arn
      Action: lambda:InvokeFunction
      Principal: apigateway.amazonaws.com
      SourceArn:
        Fn::Join:
        - ''
        - - 'arn:'
          - Ref: AWS::Partition
          - ":execute-api:"
          - Ref: AWS::Region
          - ":"
          - Ref: AWS::AccountId
          - ":"
          - Ref: ApiGatewayRestApi
          - "/*/*"
Outputs:
  ServerlessDeploymentBucketName:
    Value:
      Ref: ServerlessDeploymentBucket
    Export:
      Name: sls-aws-python-rest-api-dev-ServerlessDeploymentBucketName
  HelloLambdaFunctionQualifiedArn:
    Description: Current Lambda function version
    Value:
      Ref: HelloLambdaVersionP8UAvh48AIJQ7pb2vPXamLWuIzfvJ5UVnkjBIee8CU
    Export:
      Name: sls-aws-python-rest-api-dev-HelloLambdaFunctionQualifiedArn
  ServiceEndpoint:
    Description: URL of the service endpoint
    Value:
      Fn::Join:
      - ''
      - - https://
        - Ref: ApiGatewayRestApi
        - ".execute-api."
        - Ref: AWS::Region
        - "."
        - Ref: AWS::URLSuffix
        - "/dev"
    Export:
      Name: sls-aws-python-rest-api-dev-ServiceEndpoint
```
:::

As we can see we do not have aliases associated to our functions, the aliases work as pointers to specific versions of a function, this allows us to manage more easily our versions without the need to update the stack of that project as the [serverless rollback](https://www.serverless.com/framework/docs/providers/aws/cli-reference/rollback) command currently does.

```sh
serverless rollback --timestamp timestamp
```

With SAH we can easily create these aliases in our serverless project in this way if we want to rollback to a previous version we just need to configure the alias to point to this.

## SAH Plugin

This is a serverless plugin that allow create aliases without imposing a way-of-working with them.

- Create an **"ACTIVE"** alias, and using that alias in **API Gateway**, **Event Sources** and **Event Rules**.
- Connect your deployments with the **SAH application**.

[GitHub Repository](https://github.com/FSHLL/sah-plugin)

## SAH App

This application will facilitate the management of your alias pointing to the version you need easily either manually
or with the information provided by your deployments.

- Create projects from a stack.
- Easily monitor your functions, deployments and versions.

[GitHub Repository](https://github.com/FSHLL/sah)