<template>
  <div>
    <div class="big-title title">
      vue当中行为比较规范的popup~<br>
      同时支持很丰富的过渡动画~<br>
      强大的位置定位~<br><br>
    </div>
    <div class="cell" 
      v-for="(nav, key) in navs"
      :key="key"
      @click="click(nav.path)"
    >{{ nav.name }}</div>
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

    methods: {
      click (hash) {
        location.hash = hash
      }
    }
  }
</script>

<style>
  .big-title{
    font-size: 19px;
  }
</style>
