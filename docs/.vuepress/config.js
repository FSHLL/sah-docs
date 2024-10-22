import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'SAH',
  description: 'A Serverless Framework Complement',

  theme: defaultTheme({
    logo: 'images/logo-dark.png',
    logoDark: 'images/logo-light.png',

    navbar: [
      '/',
      {
        text: 'Guide',
        link: '/guide/'
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: [
            '/guide/',
            '/guide/installation.md',
            '/guide/getting_started.md',
          ],
        },
      ],
    }

  }),

  bundler: viteBundler(),
})
