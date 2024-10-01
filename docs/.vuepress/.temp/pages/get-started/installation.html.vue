<template><div><h1 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h1>
<h2 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements"><span>Requirements</span></a></h2>
<ul>
<li>php:^8.1</li>
<li>ext-pcntl</li>
</ul>
<p>Typically the PCNTL extension is part of the default PHP installation, you can check if the extension is active with the <code v-pre>php -m</code> command, if it is not listed you must activate it.</p>
<h2 id="composer-installation" tabindex="-1"><a class="header-anchor" href="#composer-installation"><span>Composer installation</span></a></h2>
<p>You must have <a href="https://getcomposer.org/" target="_blank" rel="noopener noreferrer">Composer<ExternalLinkIcon/></a> installed on your computer; To create your first Phenix project, you can run Composer's <strong>create-project</strong> command.</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>composer create-project phenixphp/phenix phenix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After the project has been created, start Phenix's server with the following command:</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>php public/index.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="send-request" tabindex="-1"><a class="header-anchor" href="#send-request"><span>Send request</span></a></h2>
<p>Using CURL, you can send a test request:</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>curl http://127.0.0.1:1337
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>The server responds with a default greeting:</p>
<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>Hello, world!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


