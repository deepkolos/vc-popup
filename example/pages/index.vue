<template>
  <div>
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