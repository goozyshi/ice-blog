// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import MediumLayout from './components/MediumLayout.vue'
import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import Comment from './components/Comment.vue'
import './styles/index.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: MediumLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('Tags', Tags)
    app.component('Archives', Archives)
    app.component('Page', Page)
    app.component('Comment', Comment)
  }
}
