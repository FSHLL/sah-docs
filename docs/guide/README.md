# Get Started

## Introduction

SAM was born with the intention of facilitating the rollbacks of functions in serverless projects,
making use of the aliases in associated projects we can perform a rollback in a much faster way,
without the need to redeploy using a stack.

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

```yml
---
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

As we can see we do not have aliases associated to our functions, the aliases work as pointers to specific versions of a function, this allows us to manage more easily our versions without the need to update the stack of that project as the serverless **rollback** command currently does.

With SAM we can easily create these aliases in our serverless project in this way if we want to rollback to a previous version we just need to configure the alias to point to this.

## SAM Plugin

This is a serverless plugin that allow create aliases without imposing a way-of-working with them.

- Create an "active" alias, and using that alias in API Gateway Event Sources and Event Rules.
- Connect your deployments with the SAM application.

## SAM App

This application will facilitate the management of your alias pointing to the version you need easily either manually
or with the information provided by your deployments.

- Create projects from a stack.
- Easily monitor your functions, deployments and versions.

## Installing the serveless plugin and the application in your environment

In this section, we will guide you through the process of creating a new project. The initial configuration is crucial as it lays the foundation for successful software development and deployment. Following the steps detailed below will help ensure that your project is organized, functions correctly, and meets established standards.

### Steps to register:

Next, you must follow the following steps to register:

You must go to the main page that we will show you below, where you will find the main view of Laravel. At the top right, you will see two buttons: one to register and the other to log in.

![main page](/images/cap1.png)

Enter the registration button, where you must fill out all the required fields, including your name, email address, password and its verification.
The password must meet the following mandatory requirements:

- It must be a minimum of 8 characters.

![register](/images/cap2.png)

Upon entering, you will find the main view, where the key settings will be displayed. At the top, you can see the profile.

![principal](/images/cap3.png)

In the profile section, you will find two options: one to adjust settings and another to return to the main page. By accessing the profile option, you will be able to view user information and have the option to change the password.

![menu](/images/cap4.png)

![info](/images/cap5.png)

![cambioclave](/images/cap6.png)

Below you will find tokens that will allow you to access various functions and benefits within the platform. These tokens are a valuable tool to enhance your experience and make it easier to use our features.

![tokens](/images/cap7.png)

### Login

Once you complete your registration, you can easily log into your account using your email address and the password you chose. This access option is quick and convenient, allowing you to enjoy all the features of the platform without complications. In addition, we ensure that your information is protected, guaranteeing a safe and fluid experience.

![login](/images/cap8.png)

When you access the projects page, you will find a button that says 'New'. Clicking on it will open a window to create a new project

![project](/images/cap9.png)

