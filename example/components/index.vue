<template>
  <div>
    <div class="cell" v-for="(nav, key) in navs" :key="key">
      <a :href="'#' + nav.path">
        <div class="title">{{ nav.name }}</div>
      </a>
    </div>
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

<style>
* {
  margin: 0;
  padding: 0;
}

.cell{
  height: 47px;
  display: flex;
  align-items: center;
}

</style>
