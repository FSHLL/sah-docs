import{_ as p,c as o,a as n,b as s,d as t,e,o as l,r as i}from"./app-DopjlxBt.js";const c={},u=n("h1",{id:"introduction",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#introduction"},[n("span",null,"Introduction")])],-1),k=n("p",null,"SAM was born with the intention of facilitating the rollbacks of functions in serverless projects, making use of the aliases in associated projects we can perform a rollback in a much faster way, without the need to redeploy using a stack.",-1),r={class:"custom-container tip"},d=n("p",{class:"custom-container-title"},"Alias",-1),v={href:"https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html",target:"_blank",rel:"noopener noreferrer"},m=e(`<p>Let&#39;s review how it works with the current serverless framework flow, with a basic configuration we can have a running function.</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">service</span><span class="token punctuation">:</span> aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api

<span class="token key atrule">frameworkVersion</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In AWS Cloudformation we would have the following stack:</p><details class="custom-container details"><summary>CloudFormationTemplate</summary><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">AWSTemplateFormatVersion</span><span class="token punctuation">:</span> <span class="token string">&#39;2010-09-09&#39;</span>
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
          <span class="token key atrule">Principal</span><span class="token punctuation">:</span> <span class="token string">&quot;*&quot;</span>
          <span class="token key atrule">Resource</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">&#39;&#39;</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span> <span class="token string">&#39;arn:&#39;</span>
              <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition
              <span class="token punctuation">-</span> <span class="token string">&quot;:s3:::&quot;</span>
              <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ServerlessDeploymentBucket
              <span class="token punctuation">-</span> <span class="token string">&quot;/*&quot;</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">&#39;&#39;</span>
            <span class="token punctuation">-</span> <span class="token punctuation">-</span> <span class="token string">&#39;arn:&#39;</span>
              <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition
              <span class="token punctuation">-</span> <span class="token string">&quot;:s3:::&quot;</span>
              <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ServerlessDeploymentBucket
          <span class="token key atrule">Condition</span><span class="token punctuation">:</span>
            <span class="token key atrule">Bool</span><span class="token punctuation">:</span>
              <span class="token key atrule">aws:SecureTransport</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">HelloLogGroup</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Logs<span class="token punctuation">:</span><span class="token punctuation">:</span>LogGroup
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">LogGroupName</span><span class="token punctuation">:</span> <span class="token string">&quot;/aws/lambda/aws-python-rest-api-dev-hello&quot;</span>
  <span class="token key atrule">IamRoleLambdaExecution</span><span class="token punctuation">:</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>IAM<span class="token punctuation">:</span><span class="token punctuation">:</span>Role
    <span class="token key atrule">Properties</span><span class="token punctuation">:</span>
      <span class="token key atrule">AssumeRolePolicyDocument</span><span class="token punctuation">:</span>
        <span class="token key atrule">Version</span><span class="token punctuation">:</span> <span class="token string">&#39;2012-10-17&#39;</span>
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
          <span class="token punctuation">-</span> <span class="token string">&quot;-&quot;</span>
          <span class="token punctuation">-</span> <span class="token punctuation">-</span> aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api
            <span class="token punctuation">-</span> dev
            <span class="token punctuation">-</span> lambda
        <span class="token key atrule">PolicyDocument</span><span class="token punctuation">:</span>
          <span class="token key atrule">Version</span><span class="token punctuation">:</span> <span class="token string">&#39;2012-10-17&#39;</span>
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
      <span class="token key atrule">Path</span><span class="token punctuation">:</span> <span class="token string">&quot;/&quot;</span>
      <span class="token key atrule">RoleName</span><span class="token punctuation">:</span>
        <span class="token key atrule">Fn::Join</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token string">&quot;-&quot;</span>
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
      <span class="token key atrule">Policy</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span>
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
          <span class="token punctuation">-</span> <span class="token string">&#39;&#39;</span>
          <span class="token punctuation">-</span> <span class="token punctuation">-</span> <span class="token string">&#39;arn:&#39;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition
            <span class="token punctuation">-</span> <span class="token string">&quot;:apigateway:&quot;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region
            <span class="token punctuation">-</span> <span class="token string">&quot;:lambda:path/2015-03-31/functions/&quot;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">Fn::GetAtt</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> HelloLambdaFunction
              <span class="token punctuation">-</span> Arn
            <span class="token punctuation">-</span> <span class="token string">&quot;/invocations&quot;</span>
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
        <span class="token punctuation">-</span> <span class="token string">&#39;&#39;</span>
        <span class="token punctuation">-</span> <span class="token punctuation">-</span> <span class="token string">&#39;arn:&#39;</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Partition
          <span class="token punctuation">-</span> <span class="token string">&quot;:execute-api:&quot;</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region
          <span class="token punctuation">-</span> <span class="token string">&quot;:&quot;</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>AccountId
          <span class="token punctuation">-</span> <span class="token string">&quot;:&quot;</span>
          <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ApiGatewayRestApi
          <span class="token punctuation">-</span> <span class="token string">&quot;/*/*&quot;</span>
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
      <span class="token punctuation">-</span> <span class="token string">&#39;&#39;</span>
      <span class="token punctuation">-</span> <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//
        <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> ApiGatewayRestApi
        <span class="token punctuation">-</span> <span class="token string">&quot;.execute-api.&quot;</span>
        <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>Region
        <span class="token punctuation">-</span> <span class="token string">&quot;.&quot;</span>
        <span class="token punctuation">-</span> <span class="token key atrule">Ref</span><span class="token punctuation">:</span> AWS<span class="token punctuation">:</span><span class="token punctuation">:</span>URLSuffix
        <span class="token punctuation">-</span> <span class="token string">&quot;/dev&quot;</span>
    <span class="token key atrule">Export</span><span class="token punctuation">:</span>
      <span class="token key atrule">Name</span><span class="token punctuation">:</span> sls<span class="token punctuation">-</span>aws<span class="token punctuation">-</span>python<span class="token punctuation">-</span>rest<span class="token punctuation">-</span>api<span class="token punctuation">-</span>dev<span class="token punctuation">-</span>ServiceEndpoint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,4),b={href:"https://www.serverless.com/framework/docs/providers/aws/cli-reference/rollback",target:"_blank",rel:"noopener noreferrer"},y=e(`<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>serverless rollback <span class="token parameter variable">--timestamp</span> timestamp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>With SAM we can easily create these aliases in our serverless project in this way if we want to rollback to a previous version we just need to configure the alias to point to this.</p><h2 id="sam-plugin" tabindex="-1"><a class="header-anchor" href="#sam-plugin"><span>SAM Plugin</span></a></h2><p>This is a serverless plugin that allow create aliases without imposing a way-of-working with them.</p><ul><li>Create an <strong>&quot;ACTIVE&quot;</strong> alias, and using that alias in <strong>API Gateway</strong>, <strong>Event Sources</strong> and <strong>Event Rules</strong>.</li><li>Connect your deployments with the <strong>SAH application</strong>.</li></ul>`,5),h={href:"https://github.com/FSHLL/sah-plugin",target:"_blank",rel:"noopener noreferrer"},g=n("h2",{id:"sam-app",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#sam-app"},[n("span",null,"SAM App")])],-1),f=n("p",null,"This application will facilitate the management of your alias pointing to the version you need easily either manually or with the information provided by your deployments.",-1),A=n("ul",null,[n("li",null,"Create projects from a stack."),n("li",null,"Easily monitor your functions, deployments and versions.")],-1),w={href:"https://github.com/FSHLL/sah",target:"_blank",rel:"noopener noreferrer"};function S(R,P){const a=i("ExternalLinkIcon");return l(),o("div",null,[u,k,n("div",r,[d,n("p",null,[s("A Lambda alias is a pointer to a function version that you can update. When you deploy a new version, you can update the alias to use the new version, or split traffic between two versions. See "),n("a",v,[s("Create an alias for a Lambda function"),t(a)])])]),m,n("p",null,[s("As we can see we do not have aliases associated to our functions, the aliases work as pointers to specific versions of a function, this allows us to manage more easily our versions without the need to update the stack of that project as the "),n("a",b,[s("serverless rollback"),t(a)]),s(" command currently does.")]),y,n("p",null,[n("a",h,[s("GitHub Repository"),t(a)])]),g,f,A,n("p",null,[n("a",w,[s("GitHub Repository"),t(a)])])])}const q=p(c,[["render",S],["__file","index.html.vue"]]),L=JSON.parse('{"path":"/guide/","title":"Introduction","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"SAM Plugin","slug":"sam-plugin","link":"#sam-plugin","children":[]},{"level":2,"title":"SAM App","slug":"sam-app","link":"#sam-app","children":[]}],"git":{"updatedTime":1729738582000,"contributors":[{"name":"Freder Steven Hernandez Llaten","email":"fredersteven399@hotmail.com","commits":5},{"name":"SteffanyRoj","email":"107969587+SteffanyRoj@users.noreply.github.com","commits":3}]},"filePathRelative":"guide/README.md"}');export{q as comp,L as data};