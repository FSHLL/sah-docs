<template><div><h1 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h1>
<h2 id="sam-plugin" tabindex="-1"><a class="header-anchor" href="#sam-plugin"><span>SAM Plugin</span></a></h2>
<p>If you only want to create aliases in your current serverless project just install the plugin and make a few small configurations.</p>
<h3 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements"><span>Requirements</span></a></h3>
<ul>
<li>Serverless Framework 3|4</li>
</ul>
<h3 id="npm-installation" tabindex="-1"><a class="header-anchor" href="#npm-installation"><span>NPM installation</span></a></h3>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>npm install --save-dev sam-plugin
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
    <span class="token key atrule">activeAliasName</span><span class="token punctuation">:</span> <span class="token string">'ACTIVE'</span>  <span class="token comment"># Default: 'INACTIVE'</span>
    <span class="token key atrule">useActiveAliasInEvents</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  <span class="token comment"># Default: false. Whether to change Lambda triggers to target the active alias or not</span>
    <span class="token key atrule">makeLambdasActive</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>  <span class="token comment"># Default: false. Whether to apply the active alias to the lambdas that are being deployed now. Could vary per environment.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sam-app" tabindex="-1"><a class="header-anchor" href="#sam-app"><span>SAM App</span></a></h2>
<p>With SAM App you can easily manage your projects, aliases and deployments.</p>
<h3 id="requirements-1" tabindex="-1"><a class="header-anchor" href="#requirements-1"><span>Requirements</span></a></h3>
<ul>
<li>php ^8.1</li>
</ul>
<h3 id="composer-installation" tabindex="-1"><a class="header-anchor" href="#composer-installation"><span>Composer installation</span></a></h3>
<p>You must have <a href="https://getcomposer.org/" target="_blank" rel="noopener noreferrer">Composer<ExternalLinkIcon/></a> installed on your computer; To create your first Phenix project, you can run Composer's <strong>create-project</strong> command.</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>composer create-project FSHLL sam
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After the project has been created, run migrations for create database running command:</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>php artisan migrate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Start server with the following</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>php artisan serve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


