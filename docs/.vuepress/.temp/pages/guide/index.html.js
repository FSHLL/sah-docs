import comp from "/home/frederhernandez/Documentos/Univalle/Tesis/sam-docs/docs/.vuepress/.temp/pages/guide/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/\",\"title\":\"Introduction\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"SAM Plugin\",\"slug\":\"sam-plugin\",\"link\":\"#sam-plugin\",\"children\":[]},{\"level\":2,\"title\":\"SAM App\",\"slug\":\"sam-app\",\"link\":\"#sam-app\",\"children\":[]}],\"git\":{\"updatedTime\":1729597883000,\"contributors\":[{\"name\":\"Freder Steven Hernandez Llaten\",\"email\":\"fredersteven399@hotmail.com\",\"commits\":4},{\"name\":\"SteffanyRoj\",\"email\":\"107969587+SteffanyRoj@users.noreply.github.com\",\"commits\":3}]},\"filePathRelative\":\"guide/README.md\"}")
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
