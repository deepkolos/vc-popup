<template>
  <ul class="vc-popup-center-menu">
    <li class="vc-popup-center-menu-li"
      v-for="(item, key) in items"
      @click="item.click"
      :key="key"
    >{{item.name}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'vc-popup-center-menu',

    props: {
      e: {
        default: null
      },
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .vc-popup-center-menu {
    will-change: opacity, transform;
    width: calc(100vw - 36px*2 - 4px*2);
    border-radius: 3.5px;
    overflow: hidden;
    transition: all 250ms ease 0s;
    padding: 0;
    margin: 0;
  }

  .vc-popup-center-menu-li {
    display: block;
    background: white;
    padding: 13px 21px;
    font-size: 16px;
    line-height: 1.4;
    color: black;
    border-bottom: calc(2px/3) solid #EBEBEB;
    margin: 0;
  }

  .vc-popup-center-menu-li:last-child{
    border-bottom: none;
  }
</style>
