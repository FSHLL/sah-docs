import comp from "/home/frederhernandez/Documentos/Univalle/Tesis/sam-docs/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"images/logo-dark.png\",\"heroImageDark\":\"images/logo-light.png\",\"actions\":[{\"text\":\"Get Started\",\"link\":\"guide/\",\"type\":\"primary\"}],\"features\":[{\"title\":\"Use Alias\",\"details\":\"Improve your rollbacks using aliases for your functions.\"},{\"title\":\"Easy integration\",\"details\":\"Make use of the SAM Plugin to configure your project aliases and synchronize your information.\"},{\"title\":\"Improve your times\",\"details\":\"You will no longer depend on updating a stack for your rollbacks, just update the alias to point to the required version.\"}],\"footer\":\"MIT Licensed | Copyright © 2018-present VuePress Community\"},\"headers\":[],\"git\":{\"updatedTime\":1729597752000,\"contributors\":[{\"name\":\"Freder Steven Hernandez Llaten\",\"email\":\"fredersteven399@hotmail.com\",\"commits\":2}]},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
