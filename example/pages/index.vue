<template>
  <div>
    <vc-cell :title="nav.name" is-link :to="nav.path" v-for="(nav, key) in navs" :key="key"></vc-cell>
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
