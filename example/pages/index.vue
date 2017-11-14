<template>
  <div>
    <div class="title">
      vue当中行为比较规范的popup~<br>
      同时支持很丰富的过度动画~<br>
      强大的位置定位~<br><br>
    </div>
    <a class="cell" :href="'#'+nav.path" v-for="(nav, key) in navs" :key="key">{{ nav.name }}</a>
  </div>
</template>

<script>
import { navs } from '../router'

export default {

  data () {
    return {
      navs: navs
    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style scoped>
  .title{
    font-size: 19px;
  }
</style>
