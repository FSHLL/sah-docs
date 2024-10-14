import comp from "C:/Users/steff/Documents/GitHub/sam-docs/docs/.vuepress/.temp/pages/guide/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/\",\"title\":\"Get Started\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Introduction\",\"slug\":\"introduction\",\"link\":\"#introduction\",\"children\":[]},{\"level\":2,\"title\":\"SAM Plugin\",\"slug\":\"sam-plugin\",\"link\":\"#sam-plugin\",\"children\":[]},{\"level\":2,\"title\":\"SAM App\",\"slug\":\"sam-app\",\"link\":\"#sam-app\",\"children\":[]},{\"level\":2,\"title\":\"Installing the serveless plugin and the application in your environment\",\"slug\":\"installing-the-serveless-plugin-and-the-application-in-your-environment\",\"link\":\"#installing-the-serveless-plugin-and-the-application-in-your-environment\",\"children\":[{\"level\":3,\"title\":\"Steps to register:\",\"slug\":\"steps-to-register\",\"link\":\"#steps-to-register\",\"children\":[]},{\"level\":3,\"title\":\"Login\",\"slug\":\"login\",\"link\":\"#login\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"guide/README.md\"}")
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
