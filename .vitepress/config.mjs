import { defineConfig } from 'vitepress'
import { getPosts } from './utils/postsUtils'

//每页的文章数量
const pageSize = 10
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ice",
  description: "ice-blog | vitepress",
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    posts: await getPosts(pageSize),
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    outlineTitle: '文章摘要',
    nav: [
      { text: '首页', link: '/pages/index' },
      { text: '归档', link: '/pages/archives' },
      { text: '分类', link: '/pages/tags' },
      { text: 'About', link: '/pages/intro' },
    ],
    // sidebar: {
    //   "/posts/yuque": await genYuqueSideBar('/posts/yuque'),
    //   // "/docs-shorturl/": await genYuqueSideBarWithShortUrl('/docs-shorturl')
    // },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },
  srcExclude: ['README.md'], // exclude the README.md , needn't to compiler
  vite: {
    //build: { minify: false }
    server: { port: 1207 }
  }
})
