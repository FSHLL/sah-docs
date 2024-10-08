export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/frederhernandez/Documentos/Univalle/Tesis/sam-docs/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/frederhernandez/Documentos/Univalle/Tesis/sam-docs/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"Get Started"} }],
  ["/guide/getting_started.html", { loader: () => import(/* webpackChunkName: "getting_started.html" */"/home/frederhernandez/Documentos/Univalle/Tesis/sam-docs/docs/.vuepress/.temp/pages/guide/getting_started.html.js"), meta: {"title":"Getting started"} }],
  ["/guide/installation.html", { loader: () => import(/* webpackChunkName: "installation.html" */"/home/frederhernandez/Documentos/Univalle/Tesis/sam-docs/docs/.vuepress/.temp/pages/guide/installation.html.js"), meta: {"title":"Installation"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/home/frederhernandez/Documentos/Univalle/Tesis/sam-docs/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
