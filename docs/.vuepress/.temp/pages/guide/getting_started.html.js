import comp from "/home/frederhernandez/Documentos/Univalle/Tesis/sam-docs/docs/.vuepress/.temp/pages/guide/getting_started.html.vue"
const data = JSON.parse("{\"path\":\"/guide/getting_started.html\",\"title\":\"Getting started\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Create project\",\"slug\":\"create-project\",\"link\":\"#create-project\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"guide/getting_started.md\"}")
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
