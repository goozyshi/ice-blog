<template>
  <div>
    Comment
  </div>
</template>
<script  setup>
import { useData } from 'vitepress'

const { site, theme } = useData()
const website = theme.value.website
const webTitle = site.value.title

</script>