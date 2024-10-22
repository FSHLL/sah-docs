<template><div><h1 id="get-started" tabindex="-1"><a class="header-anchor" href="#get-started"><span>Get Started</span></a></h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h2>
<p>SAM was born with the intention of facilitating the rollbacks of functions in serverless projects,
making use of the aliases in associated projects we can perform a rollback in a much faster way,
without the need to redeploy using a stack.</p>
<p>Let's review how it works with the current serverless framework flow, with a basic configuration we can have a running function.</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">service</span><span class="token punctuation">:</span> aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api

<span class="token key atrule">frameworkVersion</span><span class="token punctuation">:</span> <span class="token string">'3'</span>

<span class="token key atrule">provider</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> aws
  <span class="token key atrule">runtime</span><span class="token punctuation">:</span> python3.8

<span class="token key atrule">functions</span><span class="token punctuation">:</span>
  <span class="token key atrule">hello</span><span class="token punctuation">:</span>
    <span class="token key atrule">handler</span><span class="token punctuation">:</span> handler.hello
    <span class="token key atrule">events</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /
          <span class="token key atrule">method</span><span class="token punctuation">:</span> get
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In AWS Cloudformation we would have the following stack:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">AWSTemplateFormatVersion</span><span class="token punctuation">:</span> <span class="token string">'2010-09-09'</span>
<span class="token key atrule">Description</span><span class="token punctuation">:</span> The AWS CloudFormation template for this Serverless application
<span class="token key atrule">Resources</span><span class="token punctuation">:</span>
  <span class="token key atrule">ServerlessDeploymentBucket</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>S3<span class="token punctuation">:</span><span class="token punctuation">:</span>Bucket
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">BucketEncryption</span><span class="token punctuation">:</span>
        <span class="token key atrule">ServerSideEncryptionConfiguration</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">ServerSideEncryptionByDefault</span><span class="token punctuation">:</span>
            <span class="token key atrule">SSEAlgorithm</span><span class="token punctuation">:</span> AES256
  <span class="token key atrule">ServerlessDeploymentBucketPolicy</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>S3<span class="token punctuation">:</span><span class="token punctuation">:</span>BucketPolicy
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">Bucket</span><span class="token punctuation">:</span>
        <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ServerlessDeploymentBucket
      <span class="token key atrule">PolicyDocument</span><span class="token punctuation">:</span>
        <span class="token key atrule">Statement</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">Action</span><span class="token punctuation">:</span> s3<span class="token punctuation">:</span>*
          <span class="token key atrule">Effect</span><span class="token punctuation">:</span> Deny
          <span class="token key atrule">Principal</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
          <span class="token key atrule">Resource</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">''</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span> <span class="token string">'arn:'</span>
              <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition
              <span class="token punctuation">-</span> <span class="token string">":s3:::"</span>
              <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ServerlessDeploymentBucket
              <span class="token punctuation">-</span> <span class="token string">"/*"</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">''</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span> <span class="token string">'arn:'</span>
              <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition
              <span class="token punctuation">-</span> <span class="token string">":s3:::"</span>
              <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ServerlessDeploymentBucket
          <span class="token key atrule">Condition</span><span class="token punctuation">:</span>
            <span class="token key atrule">Bool</span><span class="token punctuation">:</span>
              <span class="token key atrule">aws:SecureTransport</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">HelloLogGroup</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Logs<span class="token punctuation">:</span><span class="token punctuation">:</span>LogGroup
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">LogGroupName</span><span class="token punctuation">:</span> <span class="token string">"/aws/lambda/aws-python-rest-api-dev-hello"</span>
  <span class="token key atrule">IamRoleLambdaExecution</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>IAM<span class="token punctuation">:</span><span class="token punctuation">:</span>Role
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">AssumeRolePolicyDocument</span><span class="token punctuation">:</span>
        <span class="token key atrule">Version</span><span class="token punctuation">:</span> <span class="token string">'2012-10-17'</span>
        <span class="token key atrule">Statement</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">Effect</span><span class="token punctuation">:</span> Allow
          <span class="token key atrule">Principal</span><span class="token punctuation">:</span>
            <span class="token key atrule">Service</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> lambda.amazonaws.com
          <span class="token key atrule">Action</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> sts<span class="token punctuation">:</span>AssumeRole
      <span class="token key atrule">Policies</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">PolicyName</span><span class="token punctuation">:</span>
          <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">"-"</span>
          <span class="token punctuation">-</span> <span class="token punctuation">-</span> aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api
            <span class="token punctuation">-</span> dev
            <span class="token punctuation">-</span> lambda
        <span class="token key atrule">PolicyDocument</span><span class="token punctuation">:</span>
          <span class="token key atrule">Version</span><span class="token punctuation">:</span> <span class="token string">'2012-10-17'</span>
          <span class="token key atrule">Statement</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Effect</span><span class="token punctuation">:</span> Allow
            <span class="token key atrule">Action</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> logs<span class="token punctuation">:</span>CreateLogStream
            <span class="token punctuation">-</span> logs<span class="token punctuation">:</span>CreateLogGroup
            <span class="token punctuation">-</span> logs<span class="token punctuation">:</span>TagResource
            <span class="token key atrule">Resource</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">Fn::Sub</span><span class="token punctuation">:</span> arn<span class="token punctuation">:</span>$<span class="token punctuation">{</span>AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition<span class="token punctuation">}</span><span class="token punctuation">:</span>logs<span class="token punctuation">:</span>$<span class="token punctuation">{</span>AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>AccountId<span class="token punctuation">}</span><span class="token punctuation">:</span>log<span class="token punctuation">-</span>group<span class="token punctuation">:</span>/aws/lambda/aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api<span class="token punctuation">-</span>dev<span class="token important">*:*</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Effect</span><span class="token punctuation">:</span> Allow
            <span class="token key atrule">Action</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> logs<span class="token punctuation">:</span>PutLogEvents
            <span class="token key atrule">Resource</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">Fn::Sub</span><span class="token punctuation">:</span> arn<span class="token punctuation">:</span>$<span class="token punctuation">{</span>AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition<span class="token punctuation">}</span><span class="token punctuation">:</span>logs<span class="token punctuation">:</span>$<span class="token punctuation">{</span>AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>AccountId<span class="token punctuation">}</span><span class="token punctuation">:</span>log<span class="token punctuation">-</span>group<span class="token punctuation">:</span>/aws/lambda/aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api<span class="token punctuation">-</span>dev<span class="token important">*:*:*</span>
      <span class="token key atrule">Path</span><span class="token punctuation">:</span> <span class="token string">"/"</span>
      <span class="token key atrule">RoleName</span><span class="token punctuation">:</span>
        <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token string">"-"</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span> aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api
          <span class="token punctuation">-</span> dev
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region
          <span class="token punctuation">-</span> lambdaRole
  <span class="token key atrule">HelloLambdaFunction</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Lambda<span class="token punctuation">:</span><span class="token punctuation">:</span>Function
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">Code</span><span class="token punctuation">:</span>
        <span class="token key atrule">S3Bucket</span><span class="token punctuation">:</span>
          <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ServerlessDeploymentBucket
        <span class="token key atrule">S3Key</span><span class="token punctuation">:</span> serverless/aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api/dev/1727612825604<span class="token punctuation">-</span>2024<span class="token punctuation">-</span>09<span class="token punctuation">-</span>29T12<span class="token punctuation">:</span>27<span class="token punctuation">:</span>05.604Z/aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api.zip
      <span class="token key atrule">Handler</span><span class="token punctuation">:</span> handler.hello
      <span class="token key atrule">Runtime</span><span class="token punctuation">:</span> python3.8
      <span class="token key atrule">FunctionName</span><span class="token punctuation">:</span> aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api<span class="token punctuation">-</span>dev<span class="token punctuation">-</span>hello
      <span class="token key atrule">MemorySize</span><span class="token punctuation">:</span> <span class="token number">1024</span>
      <span class="token key atrule">Timeout</span><span class="token punctuation">:</span> <span class="token number">6</span>
      <span class="token key atrule">Role</span><span class="token punctuation">:</span>
        <span class="token key atrule">Fn::GetAtt</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> IamRoleLambdaExecution
        <span class="token punctuation">-</span> Arn
    <span class="token key atrule">DependsOn</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> HelloLogGroup
  <span class="token key atrule">HelloLambdaVersionP8UAvh48AIJQ7pb2vPXamLWuIzfvJ5UVnkjBIee8CU</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Lambda<span class="token punctuation">:</span><span class="token punctuation">:</span>Version
    <span class="token key atrule">DeletionPolicy</span><span class="token punctuation">:</span> Retain
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">FunctionName</span><span class="token punctuation">:</span>
        <span class="token key atrule">Ref</span><span class="token punctuation">:</span> HelloLambdaFunction
      <span class="token key atrule">CodeSha256</span><span class="token punctuation">:</span> Cow3ahBjOjSbQ8EHUWOZIzOk6f4Sf50opPeYFGX4J4M=
  <span class="token key atrule">ApiGatewayRestApi</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>ApiGateway<span class="token punctuation">:</span><span class="token punctuation">:</span>RestApi
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">Name</span><span class="token punctuation">:</span> dev<span class="token punctuation">-</span>aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api
      <span class="token key atrule">EndpointConfiguration</span><span class="token punctuation">:</span>
        <span class="token key atrule">Types</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> EDGE
      <span class="token key atrule">Policy</span><span class="token punctuation">:</span> <span class="token string">''</span>
  <span class="token key atrule">ApiGatewayMethodGet</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>ApiGateway<span class="token punctuation">:</span><span class="token punctuation">:</span>Method
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">HttpMethod</span><span class="token punctuation">:</span> GET
      <span class="token key atrule">RequestParameters</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token key atrule">ResourceId</span><span class="token punctuation">:</span>
        <span class="token key atrule">Fn::GetAtt</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> ApiGatewayRestApi
        <span class="token punctuation">-</span> RootResourceId
      <span class="token key atrule">RestApiId</span><span class="token punctuation">:</span>
        <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ApiGatewayRestApi
      <span class="token key atrule">ApiKeyRequired</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">AuthorizationType</span><span class="token punctuation">:</span> NONE
      <span class="token key atrule">Integration</span><span class="token punctuation">:</span>
        <span class="token key atrule">IntegrationHttpMethod</span><span class="token punctuation">:</span> POST
        <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS_PROXY
        <span class="token key atrule">Uri</span><span class="token punctuation">:</span>
          <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">''</span>
          <span class="token punctuation">-</span> <span class="token punctuation">-</span> <span class="token string">'arn:'</span>
            <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition
            <span class="token punctuation">-</span> <span class="token string">":apigateway:"</span>
            <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region
            <span class="token punctuation">-</span> <span class="token string">":lambda:path/2015-03-31/functions/"</span>
            <span class="token punctuation">-</span> <span class="token key atrule">Fn::GetAtt</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> HelloLambdaFunction
              <span class="token punctuation">-</span> Arn
            <span class="token punctuation">-</span> <span class="token string">"/invocations"</span>
      <span class="token key atrule">MethodResponses</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token key atrule">DependsOn</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> HelloLambdaPermissionApiGateway
  <span class="token key atrule">ApiGatewayDeployment1727612823481</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>ApiGateway<span class="token punctuation">:</span><span class="token punctuation">:</span>Deployment
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">RestApiId</span><span class="token punctuation">:</span>
        <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ApiGatewayRestApi
      <span class="token key atrule">StageName</span><span class="token punctuation">:</span> dev
    <span class="token key atrule">DependsOn</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ApiGatewayMethodGet
  <span class="token key atrule">HelloLambdaPermissionApiGateway</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Lambda<span class="token punctuation">:</span><span class="token punctuation">:</span>Permission
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">FunctionName</span><span class="token punctuation">:</span>
        <span class="token key atrule">Fn::GetAtt</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> HelloLambdaFunction
        <span class="token punctuation">-</span> Arn
      <span class="token key atrule">Action</span><span class="token punctuation">:</span> lambda<span class="token punctuation">:</span>InvokeFunction
      <span class="token key atrule">Principal</span><span class="token punctuation">:</span> apigateway.amazonaws.com
      <span class="token key atrule">SourceArn</span><span class="token punctuation">:</span>
        <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token string">''</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span> <span class="token string">'arn:'</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition
          <span class="token punctuation">-</span> <span class="token string">":execute-api:"</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region
          <span class="token punctuation">-</span> <span class="token string">":"</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>AccountId
          <span class="token punctuation">-</span> <span class="token string">":"</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ApiGatewayRestApi
          <span class="token punctuation">-</span> <span class="token string">"/*/*"</span>
<span class="token key atrule">Outputs</span><span class="token punctuation">:</span>
  <span class="token key atrule">ServerlessDeploymentBucketName</span><span class="token punctuation">:</span>
    <span class="token key atrule">Value</span><span class="token punctuation">:</span>
      <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ServerlessDeploymentBucket
    <span class="token key atrule">Export</span><span class="token punctuation">:</span>
      <span class="token key atrule">Name</span><span class="token punctuation">:</span> sls<span class="token punctuation">-</span>aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api<span class="token punctuation">-</span>dev<span class="token punctuation">-</span>ServerlessDeploymentBucketName
  <span class="token key atrule">HelloLambdaFunctionQualifiedArn</span><span class="token punctuation">:</span>
    <span class="token key atrule">Description</span><span class="token punctuation">:</span> Current Lambda function version
    <span class="token key atrule">Value</span><span class="token punctuation">:</span>
      <span class="token key atrule">Ref</span><span class="token punctuation">:</span> HelloLambdaVersionP8UAvh48AIJQ7pb2vPXamLWuIzfvJ5UVnkjBIee8CU
    <span class="token key atrule">Export</span><span class="token punctuation">:</span>
      <span class="token key atrule">Name</span><span class="token punctuation">:</span> sls<span class="token punctuation">-</span>aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api<span class="token punctuation">-</span>dev<span class="token punctuation">-</span>HelloLambdaFunctionQualifiedArn
  <span class="token key atrule">ServiceEndpoint</span><span class="token punctuation">:</span>
    <span class="token key atrule">Description</span><span class="token punctuation">:</span> URL of the service endpoint
    <span class="token key atrule">Value</span><span class="token punctuation">:</span>
      <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">''</span>
      <span class="token punctuation">-</span> <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//
        <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ApiGatewayRestApi
        <span class="token punctuation">-</span> <span class="token string">".execute-api."</span>
        <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region
        <span class="token punctuation">-</span> <span class="token string">"."</span>
        <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>URLSuffix
        <span class="token punctuation">-</span> <span class="token string">"/dev"</span>
    <span class="token key atrule">Export</span><span class="token punctuation">:</span>
      <span class="token key atrule">Name</span><span class="token punctuation">:</span> sls<span class="token punctuation">-</span>aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api<span class="token punctuation">-</span>dev<span class="token punctuation">-</span>ServiceEndpoint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As we can see we do not have aliases associated to our functions, the aliases work as pointers to specific versions of a function, this allows us to manage more easily our versions without the need to update the stack of that project as the serverless <strong>rollback</strong> command currently does.</p>
<p>With SAM we can easily create these aliases in our serverless project in this way if we want to rollback to a previous version we just need to configure the alias to point to this.</p>
<h2 id="sam-plugin" tabindex="-1"><a class="header-anchor" href="#sam-plugin"><span>SAM Plugin</span></a></h2>
<p>This is a serverless plugin that allow create aliases without imposing a way-of-working with them.</p>
<ul>
<li>Create an &quot;active&quot; alias, and using that alias in API Gateway Event Sources and Event Rules.</li>
<li>Connect your deployments with the SAM application.</li>
</ul>
<h2 id="sam-app" tabindex="-1"><a class="header-anchor" href="#sam-app"><span>SAM App</span></a></h2>
<p>This application will facilitate the management of your alias pointing to the version you need easily either manually
or with the information provided by your deployments.</p>
<ul>
<li>Create projects from a stack.</li>
<li>Easily monitor your functions, deployments and versions.</li>
</ul>
<h2 id="installing-the-serveless-plugin-and-the-application-in-your-environment" tabindex="-1"><a class="header-anchor" href="#installing-the-serveless-plugin-and-the-application-in-your-environment"><span>Installing the serveless plugin and the application in your environment</span></a></h2>
<p>In this section, we will guide you through the process of creating a new project. The initial configuration is crucial as it lays the foundation for successful software development and deployment. Following the steps detailed below will help ensure that your project is organized, functions correctly, and meets established standards.</p>
<h3 id="steps-to-register" tabindex="-1"><a class="header-anchor" href="#steps-to-register"><span>Steps to register</span></a></h3>
<p>Next, you must follow the following steps to register:</p>
<p>You must go to the main page that we will show you below, where you will find the main view of Laravel. At the top right, you will see two buttons: one to register and the other to log in.</p>
<p><img src="/images/cap1.png" alt="main page"></p>
<p>Enter the registration button, where you must fill out all the required fields, including your name, email address, password and its verification.
The password must meet the following mandatory requirements:</p>
<ul>
<li>It must be a minimum of 8 characters.</li>
</ul>
<p><img src="/images/cap2.png" alt="register"></p>
<p>Upon entering, you will find the main view, where the key settings will be displayed. At the top, you can see the profile.</p>
<p><img src="/images/cap3.png" alt="principal"></p>
<p>In the profile section, you will find two options: one to adjust settings and another to return to the main page. By accessing the profile option, you will be able to view user information and have the option to change the password.</p>
<p><img src="/images/cap4.png" alt="menu"></p>
<p><img src="/images/cap5.png" alt="info"></p>
<p><img src="/images/cap6.png" alt="cambioclave"></p>
<p>Below you will find tokens that will allow you to access various functions and benefits within the platform. These tokens are a valuable tool to enhance your experience and make it easier to use our features.</p>
<p><img src="/images/cap7.png" alt="tokens"></p>
<h3 id="login" tabindex="-1"><a class="header-anchor" href="#login"><span>Login</span></a></h3>
<p>Once you complete your registration, you can easily log into your account using your email address and the password you chose. This access option is quick and convenient, allowing you to enjoy all the features of the platform without complications. In addition, we ensure that your information is protected, guaranteeing a safe and fluid experience.</p>
<p><img src="/images/cap8.png" alt="login"></p>
<h3 id="project-creation" tabindex="-1"><a class="header-anchor" href="#project-creation"><span>Project creation</span></a></h3>
<p>When you log in, you'll be taken to the homepage. From there, you'll have the options in the dashboard, where it will show if you have the right credentials: the Keys Config section will appear. If you don't have the credentials, it will show you the option to create them.</p>
<p><img src="/images/cap9.png" alt="dasboard"></p>
<p>When you access the projects page, you will find a button that says 'New'. Clicking on it will open a window to create a new project</p>
<p><img src="/images/cap10.png" alt="project"></p>
<p>Creating a project is very easy, as it will only ask you for a name and the stack you want to use. Among the options we have for you are:</p>
<ul>
<li>aws-python-rest-api-dev: to create REST APIs with Python.</li>
<li>zappa-demo-dev: To deploy applications on AWS Lambda.</li>
<li>bref-demo-dev: if you work with PHP.</li>
<li>steam-network-1710382473: If you prefer to use Swift.</li>
</ul>
<p><img src="/images/cap12.png" alt="project"></p>
</div></template>


