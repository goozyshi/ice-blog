import { defineConfig } from 'vitepress'
import { getPosts } from './utils/postsUtils'
import { YuQueSVG } from "./utils/svgUtils";

//每页的文章数量
const pageSize = 10
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "饮冰🧊",
  description: "goozyshi 的博客",
  ignoreDeadLinks: true,
  // base: '/',
  themeConfig: {
    posts: await getPosts(pageSize),
    search: {
      provider: 'local'
    },
    outlineTitle: '文章摘要',
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/pages/archives' },
      { text: '分类', link: '/pages/tags' },
      { text: 'About', link: '/pages/intro' },
    ],
    // sidebar: {
    //   "/posts/yuque": await genYuqueSideBar('/posts/yuque'),
    //   // "/docs-shorturl/": await genYuqueSideBarWithShortUrl('/docs-shorturl')
    // },
    socialLinks: [
      { icon: { svg: YuQueSVG }, link: "https://www.yuque.com/goozyshi/blink" },
      { icon: 'github', link: 'https://github.com/goozyshi' }
    ],
  },
  srcExclude: ['README.md'], // exclude the README.md , needn't to compiler
  vite: {
    //build: { minify: false }
    server: { port: 1207 }
  }
})
