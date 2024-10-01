# Installation

## SAM Plugin

If you only want to create aliases in your current serverless project just install the plugin and make a few small configurations.

### Requirements

- Serverless Framework 3|4

### NPM installation

```
npm install --save-dev sam-plugin
```

Add the plugin to serverless.yml:

```yml
plugins:
  - sam-plugin
```

### Configuration

Inside your Serverless config, include this plugin and define a `custom.sam` object and specify the activeAliasName

```yaml
plugins:
  - sam-plugin
  ...

custom:
  sam:
    activeAliasName: 'ACTIVE'  # Default: 'INACTIVE'
    useActiveAliasInEvents: true  # Default: false. Whether to change Lambda triggers to target the active alias or not
    makeLambdasActive: true  # Default: false. Whether to apply the active alias to the lambdas that are being deployed now. Could vary per environment.
```

## SAM App

With SAM App you can easily manage your projects, aliases and deployments.

### Requirements

- php ^8.1

### Composer installation

You must have [Composer](https://getcomposer.org/) installed on your computer; To create your first Phenix project, you can run Composer's **create-project** command.

```
composer create-project FSHLL sam
```

After the project has been created, run migrations for create database running command:

```
php artisan migrate
```

Start server with the following

```
php artisan serve
```
