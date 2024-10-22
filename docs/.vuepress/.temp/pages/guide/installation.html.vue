<template><div><h1 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h1>
<h2 id="sam-plugin" tabindex="-1"><a class="header-anchor" href="#sam-plugin"><span>SAM Plugin</span></a></h2>
<p>If you only want to create aliases in your current serverless project just install the plugin and make a few small configurations.</p>
<h3 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements"><span>Requirements</span></a></h3>
<ul>
<li>Serverless Framework 3|4</li>
</ul>
<h3 id="npm-installation" tabindex="-1"><a class="header-anchor" href="#npm-installation"><span>NPM installation</span></a></h3>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> sam-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Add the plugin to serverless.yml:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">plugins</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> sam<span class="token punctuation">-</span>plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h3>
<p>Inside your Serverless config, include this plugin and define a <code v-pre>custom.sam</code> object and specify the activeAliasName</p>
<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">plugins</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> sam<span class="token punctuation">-</span>plugin
  <span class="token punctuation">...</span>

<span class="token key atrule">custom</span><span class="token punctuation">:</span>
  <span class="token key atrule">sam</span><span class="token punctuation">:</span>
    <span class="token key atrule">activeAliasName</span><span class="token punctuation">:</span> <span class="token string">'ACTIVE'</span>  <span class="token comment"># Default: 'ACTIVE'</span>
    <span class="token key atrule">useActiveAliasInEvents</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>   <span class="token comment"># Default: false. Whether to change API Gateway to target the active alias or not</span>
    <span class="token key atrule">makeLambdasActive</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  <span class="token comment"># Default: false. Whether to apply the active alias to the lambdas that are being deployed now. Could vary per environment.</span>
    <span class="token key atrule">sahUrl</span><span class="token punctuation">:</span> <span class="token string">'http://{app_url}/api/projects/{project_id}/deployments'</span> <span class="token comment"># Default: null. It is not mandatory but you can use it if you wish to synchronize your displays with your SAH application.</span>
    <span class="token key atrule">sahToken</span><span class="token punctuation">:</span> <span class="token string">'1|fZH1G7lyRZZKcK4AD8PaaQlXlTeeM7bc2XdjOsqBeecfb75f'</span> <span class="token comment"># Default: null. It is not mandatory but you can use it if you wish to synchronize your displays with your SAH application.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sam-app" tabindex="-1"><a class="header-anchor" href="#sam-app"><span>SAM App</span></a></h2>
<p>With SAM App you can easily manage your projects, aliases and deployments.</p>
<h3 id="requirements-1" tabindex="-1"><a class="header-anchor" href="#requirements-1"><span>Requirements</span></a></h3>
<ul>
<li>php ^8.1</li>
</ul>
<h3 id="composer-installation" tabindex="-1"><a class="header-anchor" href="#composer-installation"><span>Composer installation</span></a></h3>
<p>You must have <a href="https://getcomposer.org/" target="_blank" rel="noopener noreferrer">Composer<ExternalLinkIcon/></a> installed on your computer; To create your first Phenix project, you can run Composer's <strong>create-project</strong> command.</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">composer</span> create-project fshll/sah
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After the project has been created, run migrations for create database running command:</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>php artisan migrate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Install node dependencies and build assets</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> run build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Start server</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>php artisan serve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>SAH execute some background process for that cases you need run the worker with the command</p>
<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code>php artisan queue:work
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>For more details visit <a href="https://laravel.com/docs/11.x/queues#running-the-queue-worker" target="_blank" rel="noopener noreferrer">Running the Queue Worker<ExternalLinkIcon/></a></p>
</div></template>


