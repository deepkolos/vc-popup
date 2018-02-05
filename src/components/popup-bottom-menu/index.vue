<template>
  <ul class="vc-popup-bottom-menu">
    <li class="vc-popup-bottom-menu-li" 
      v-for="(item, key) in items" 
      @click="item.click" 
      :key="key"
    >{{item.name}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'vc-popup-bottom-menu',

    props: {
      e: {
        default: null
      },
      items: {
        type: Array,
        required: true
      },
      onClose: Function,
      onOpen: Function
    }
  }
</script>

<style lang="scss">
  .vc-popup-bottom-menu {
    will-change: opacity, transform;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: auto;
    transition: all 250ms ease 0s;
    padding: 0;
    margin: 0;
  }

  .vc-popup-bottom-menu-li {
    background: white;
    padding: 0 21px;
    font-size: 16px;
    width: calc(100vw - 21px*2);
    color: #5e5e5e;
    min-height: 42px;
    display: flex;
    align-items: center;
    margin: 0;
  }
</style>
