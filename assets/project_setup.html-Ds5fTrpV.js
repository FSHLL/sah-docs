import{_ as o}from"./cap4-Dl0JC7g3.js";import{_ as i,c as l,a as e,b as a,d as c,w as r,e as n,r as p,o as d}from"./app-DopjlxBt.js";const u="/images/cap10.png",m="/images/cap12.png",h="/images/cap13.png",k="/images/cap14.png",g="/images/cap15.png",t="/images/cap16.png",y="/images/cap18.png",_="/images/cap19.png",f="/images/cap20.png",v={},j=n('<h1 id="project-setup" tabindex="-1"><a class="header-anchor" href="#project-setup"><span>Project Setup</span></a></h1><p>When you access the projects page, you will find a button with the icon &#39;+&#39;. Clicking on it will open a window to create a new project</p><p><img src="'+u+'" alt="project"></p><h2 id="create-project" tabindex="-1"><a class="header-anchor" href="#create-project"><span>Create Project</span></a></h2><p>Creating a project is very easy, as it will only ask you for a name and the stack (Present in your AWS Account) you want to use.</p><p><img src="'+m+'" alt="project"></p><p>Fields:</p>',7),b=e("li",null,"Project Name",-1),w=e("li",null,"Stack: AWS Cloud formation Stack (this stack is created for serverless framework for associate all project resources).",-1),x=n(`<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">custom</span><span class="token punctuation">:</span>
    <span class="token key atrule">sam</span><span class="token punctuation">:</span>
        <span class="token key atrule">activeAliasName</span><span class="token punctuation">:</span> <span class="token string">&#39;ACTIVE&#39;</span>
        <span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Once the project is created you can see them in the list</p><p><img src="`+h+'" alt="project"></p><h2 id="project-description" tabindex="-1"><a class="header-anchor" href="#project-description"><span>Project description</span></a></h2><p>When you enter the description you can see the lambda functions of the project, associated alias and its version.</p><p><img src="'+k+'" alt="project"></p><h3 id="manual-rollback" tabindex="-1"><a class="header-anchor" href="#manual-rollback"><span>Manual Rollback</span></a></h3><p>In the upper right corner you will find the first option where you can perform a manual rollback on the available versions of your lambda functions, simply select the version you want your lambda function to work with.</p><p><img src="'+g+'" alt="project"><img src="'+t+'" alt="project"></p><h3 id="edit-project" tabindex="-1"><a class="header-anchor" href="#edit-project"><span>Edit project</span></a></h3><p>In the upper right corner you will find the second option where you can edit the project if necessary.</p><p><img src="'+t+'" alt="project"></p><h3 id="deployment-url" tabindex="-1"><a class="header-anchor" href="#deployment-url"><span>Deployment URL</span></a></h3><p>In the upper right corner you will find the third option where you can see and copy thee project deployment URL, with this url you can add a extra config to the sam plugin in your <code>serverless.yml</code> file for notify to SAH a new deployment.</p><p><img src="'+y+`" alt="project"></p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">custom</span><span class="token punctuation">:</span>
    <span class="token key atrule">sam</span><span class="token punctuation">:</span>
        <span class="token key atrule">sahUrl</span><span class="token punctuation">:</span> <span class="token string">&#39;http://{app_url}/api/projects/{project_id}/deployments&#39;</span>
        <span class="token key atrule">sahToken</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>env.SAH_TOKEN<span class="token punctuation">}</span>
        <span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">SAH Token</p><p>You can obtain this token in the “Tokens” section of your profile.</p><p><img src="`+o+'" alt="menu"><img src="'+_+'" alt="tokens"></p></div><h3 id="rollback-from-deployment" tabindex="-1"><a class="header-anchor" href="#rollback-from-deployment"><span>Rollback from deployment</span></a></h3><p>With your sahUrl and sahToken for each deployment a record will be stored in the application, we can use it to backtrack more easily.</p><p><img src="'+f+'" alt="tokens"></p>',20);function S(A,P){const s=p("RouteLink");return d(),l("div",null,[j,e("ul",null,[b,w,e("li",null,[a("Alias: Alias defined in the "),c(s,{to:"/guide/#sam-plugin"},{default:r(()=>[a("SAM Plugin")]),_:1}),a(" custom config")])]),x])}const N=i(v,[["render",S],["__file","project_setup.html.vue"]]),T=JSON.parse('{"path":"/guide/project_setup.html","title":"Project Setup","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Create Project","slug":"create-project","link":"#create-project","children":[]},{"level":2,"title":"Project description","slug":"project-description","link":"#project-description","children":[{"level":3,"title":"Manual Rollback","slug":"manual-rollback","link":"#manual-rollback","children":[]},{"level":3,"title":"Edit project","slug":"edit-project","link":"#edit-project","children":[]},{"level":3,"title":"Deployment URL","slug":"deployment-url","link":"#deployment-url","children":[]},{"level":3,"title":"Rollback from deployment","slug":"rollback-from-deployment","link":"#rollback-from-deployment","children":[]}]}],"git":{"updatedTime":1730588164000,"contributors":[{"name":"Freder Steven Hernandez Llaten","email":"fredersteven399@hotmail.com","commits":1}]},"filePathRelative":"guide/project_setup.md"}');export{N as comp,T as data};