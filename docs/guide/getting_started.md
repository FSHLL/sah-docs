# Getting started

In this section, we will guide you through the process of creating a new project. The initial configuration is crucial as it lays the foundation for successful software development and deployment. Following the steps detailed below will help ensure that your project is organized, functions correctly, and meets established standards.

> **Important** <br>
> If you liked SAH, and you have seen the potential and the great opportunity we have in the Serverless community, I invite you to give it a star on [GitHub](https://github.com/FSHLL/sah) and contribute to the development of this great tol.

<!-- ## Create project -->

### Register

Next, you must follow the following steps to register:

You must go to the main page that we will show you below, where you will find the main view of Laravel. At the top right, you will see two buttons: one to register and the other to log in.

![main page](/images/cap1.png)

Enter the registration button, where you must fill out all the required fields, including your name, email address, password and its verification.
The password must meet the following mandatory requirements:

- It must be a minimum of 8 characters.

![register](/images/cap2.png)

When you log in, you'll be taken to the homepage. From there, you'll have the options in the dashboard, where it will show if you have the right credentials: the Keys Config section will appear. If you don't have the credentials, it will show you the option to create them.

![dasboard](/images/cap3.png)

![dasboard](/images/cap9.png)

::: tip AWS credentials
Currently SAH supports AWS as a provider, AWS here you can configure your credentials with the necessary permissions to operate, for the creation of these credentials and more detail, please visit the [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
:::

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:ListStacks",
        "cloudformation:DescribeStacks",
        "cloudformation:DescribeStackResources"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "lambda:ListFunctions",
        "lambda:GetFunction",
        "lambda:UpdateAlias",
        "lambda:ListVersionsByFunction",
        "lambda:GetAlias",
        "lambda:UpdateFunctionConfiguration"
      ],
      "Resource": "*"
    }
  ]
}

```

In the profile section, you will find two options: one to adjust settings and another to return to the main page. By accessing the profile option, you will be able to view user information and have the option to change the password.

![menu](/images/cap4.png)

![info](/images/cap5.png)

![cambioclave](/images/cap6.png)

Below you will find tokens that will allow you to access various functions and benefits within the platform. These tokens are a valuable tool to enhance your experience and make it easier to use our features.

![tokens](/images/cap7.png)

### Login

Once you complete your registration, you can easily log into your account using your email address and the password you chose. This access option is quick and convenient, allowing you to enjoy all the features of the platform without complications. In addition, we ensure that your information is protected, guaranteeing a safe and fluid experience.

![login](/images/cap8.png)