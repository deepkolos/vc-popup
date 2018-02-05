<template>
  <ul class="vc-popup-dom-relative">
    <li class="vc-popup-dom-relative-li" v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'vc-popup-dom-relative',

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
  .vc-popup-dom-relative {
    will-change: opacity, transform;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
    transition: all 220ms ease 0s;
    display: inline-block;
    padding: 0;
    margin: 0;

    &.animation-in.animation-init {
      opacity: 0;
      transform: scale(0.8) translateZ(0);
    }

    &.animation-in {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }

    &.animation-out {
      opacity: 0;
      transform: scale(0.75) translateZ(0);
      transition-duration: 250ms;
    }
  }

  .vc-popup-dom-relative-li {
    height: 43px;
    line-height: 43px;
    padding: 0 30px 0 15px;
    font-size: 14px;
    display: block;
    background: white;
    min-width: calc(90px - 45px);
    margin: 0;
  }

  .vc-popup-dom-relative-li:active {
    background: #E8E8E8;
    transition: all 80ms linear 0ms;
  }
</style>
