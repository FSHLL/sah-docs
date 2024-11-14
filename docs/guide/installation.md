# Installation

## SAH Plugin

If you only want to create aliases in your current serverless project just install the plugin and make a few small configurations.

### Requirements

- Serverless Framework 3|4

### NPM installation

```sh
npm install -D sah-plugin
```

Add the plugin to serverless.yml:

```yml
plugins:
  - sah-plugin
```

### Configuration

Inside your Serverless config, include this plugin and define a `custom.sah` object and specify the activeAliasName

```yaml
plugins:
  - sah-plugin
  ...

custom:
  sah:
    activeAliasName: 'ACTIVE'  # Default: 'ACTIVE'
    useActiveAliasInEvents: true   # Default: false. Whether to change API Gateway to target the active alias or not
    makeLambdasActive: true  # Default: false. Whether to apply the active alias to the lambdas that are being deployed now. Could vary per environment.
    sahUrl: 'http://{app_url}/api/projects/{project_id}/deployments' # Default: null. It is not mandatory but you can use it if you wish to synchronize your displays with your SAH application.
    sahToken: '1|fZH1G7lyRZZKcK4AD8PaaQlXlTeeM7bc2XdjOsqBeecfb75f' # Default: null. It is not mandatory but you can use it if you wish to synchronize your displays with your SAH application.
```

## SAH App

With SAH App you can easily manage your projects, aliases and deployments.

### Requirements

- php >=8.1

### Composer installation

You must have [Composer](https://getcomposer.org/) installed on your computer; To create your first Phenix project, you can run Composer's **create-project** command.

```sh
composer create-project fshll/sah
```

After the project has been created, run migrations for create database running command:

```sh
php artisan migrate
```

Install node dependencies and build assets

```sh
npm install && npm run build
```

Start server

```sh
php artisan serve
```

SAH execute some background process for that cases you need run the worker with the command

```sh
php artisan queue:work
```

For more details visit [Running the Queue Worker](https://laravel.com/docs/11.x/queues#running-the-queue-worker)