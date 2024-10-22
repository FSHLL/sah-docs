import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'SAH',
  description: 'A Serverless Framework Complement',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/LOGO.png',

    navbar: [
      '/',
      '/guide/'
    ],
    // sidebar: 'false'
  }),

  bundler: viteBundler(),
})
