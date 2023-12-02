<template>
  <div class="site-footer">
    MIT Licensed | Copyright © 2019-2023 <a class="vitepress" :href="website">{{ webTitle }}</a><br />
    Powered by <a class="vitepress" target="_blank" href="//vitepress.vuejs.org/">VitePress - 1.0.0-rc.31</a>
    Inpire by <a class="vitepress" target="_blank" href="//github.com/Moking1997/vitepress-blog">vitepress-blog</a>
  </div>
</template>
<script  setup>
import { useData } from 'vitepress'

const { site, theme } = useData()
const website = theme.value.website
const webTitle = site.value.title

</script>
<style>
.site-footer {
  color: #888;
  text-align: center;
  font-size: 0.75rem;
  width: 100%;
  padding: 15px 0;
  overflow: auto;
}
.vitepress {
  color: var(--vp-c-text-1);
  font-weight: 700;
}
</style>