<template>
  <div class="vc-dialog"
  :class="{
    'skin_android': skin === 'android',
    'skin_ios_native': skin === 'iosNative',
    'skin_lol': skin === 'lol',
  }">
    <div class="vc-dialog-wrapper">
      <div class="vc-dialog-head" v-if="title">
        <strong class="vc-dialog-title" v-html="title"></strong>
      </div>
      <div class="vc-dialog-body" v-html="message"></div>
      <div class="vc-dialog-footer">
        <a class="vc-dialog-btn vc-dialog-btn_default"
          v-if="showCancelBtn"
          @click="cancelClick"
          v-text="cancelText"></a>
        <a class="vc-dialog-btn vc-dialog-btn_primary"
          v-if="showConfirmBtn"
          @click="confirmClick"
          v-text="confirmText"></a>
      </div>
    </div>
    <svg display="none">
      <filter id="skin_lol-turbulence-out">
          <feTurbulence type="fractalNoise" baseFrequency="0 8.001" numOctaves="2" data-filterId="3" />
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="20" />
      </filter>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'vc-popup-dialog',

    props: {
      e: {
        default: null
      },
      onCancel: Function,
      onComfrim: Function,

      //原本
      skin: {
        type: String,
        default: 'ios'
      },
      title: String,
      message: String,
      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      showConfirmBtn: {
        type: Boolean,
        default: true
      },
      showCancelBtn: {
        type: Boolean,
        default: true
      }
    },

    created () {
      this.popupEvt = {
        inAnimation: () => {
          var $el = this.$el

          $el.classList.add('vc-animation-init')
          requestAnimationFrame(() => {
            $el.classList.remove('vc-animation-init')
            $el.classList.add('vc-animation-in')
            setTimeout(() => {
              if (
                this.skin === 'iosNative' &&
                this.$popupCtrl.config.maskOpacity !== undefined
              ) this.$popupCtrl.vmBase.setMaskOpacity(0.4)
            }, 0)
          })
        },
        outAnimation: () => {
          var $el = this.$el

          $el.classList.add('vc-animation-out')
          if (this.skin === 'lol')
            $el.parentElement.classList.add('vc-dialog-effect-blur')
          requestAnimationFrame(function () {
            $el.classList.remove('vc-animation-in')
          })
        }
      }
    },

    methods: {

      close () {
        this.$popupCtrl.close()
      },

      confirmClick () {
        if (typeof this.onComfrim === 'function')
          this.onComfrim()
        this.close()
      },

      cancelClick () {
        if (typeof this.onCancel === 'function')
          this.onCancel()
        this.close()
      }

    }
  }
</script>

<style lang="scss">
  .vc-dialog {
    will-change: opacity, transform;
    display: inline-block;
    background: white;
    border-radius: 3px;
    font-size: 15px;
    transition: all 200ms ease 0s;
    width: 80%;
    max-width: 300px;
    overflow: hidden;
    text-align: center;

    &.vc-animation-init {
      opacity: 0;
      transform: scale(0.9) translateZ(0);
    }

    &.vc-animation-in {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }

    &.vc-animation-out {
      opacity: 0;
      transform: scale(0.9) translateZ(0);
      transition-duration: 300ms;
    }
  }

  .vc-dialog-body{
    padding: 0 1.6em .8em;
    min-height: 40px;
    font-size: 16px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #999;

    &:first-child {
      padding: 2.7em 20px 1.7em;
      color: #353535;
    }
  }
  
  .vc-dialog-footer {
    position: relative;
    line-height: 48px;
    font-size: 17px;
    display: flex;

    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d5d5d6;
      color: #d5d5d6;
      transform-origin: 0 0;
      transform: scaleY(.5);
    }
  }

  .vc-dialog-head {
    padding: 1.3em 1.6em .5em;
  }

  .vc-dialog-title {
    font-weight: 400;
    font-size: 18px;
  }

  .vc-dialog-btn {
    display: block;
    flex: 1;
    color: #3cc51f;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: relative;

    &:active{
      background-color: #EEEEEE;
    }

    &.vc-dialog-btn_default {
      color: #353535;
    }

    &.vc-dialog-btn_primary {
      color: #0bb20c;
    }

    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      border-left: 1px solid #d5d5d6;
      color: #d5d5d6;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleX(.5);
      transform: scaleX(.5);
    }
  }

  .vc-dialog.skin_android {
    & .vc-dialog-footer:after{
      content: none;
    }

    & .vc-dialog-btn:after{
      content: none;
    }
    
    & .vc-dialog-btn {
      display: inline-block;
      vertical-align: top;
      padding: 0 .8em;

      & :last-child {
        margin-right: -.8em;
      }
    }

    & .vc-dialog-btn_default {
      color: gray;
    }

    & .vc-dialog-footer {
      display: block;
      text-align: right;
      line-height: 42px;
      font-size: 16px;
      padding: 0 1.6em .7em;
    }

    & .vc-dialog-body {
      color: #999;
      padding: .25em 1.6em 2em;
      font-size: 17px;
      text-align: left;

      &:first-child {
        padding: 1.6em 1.6em 2em;
        color: #353535;
      }
    }

    & .vc-dialog-head {
      text-align: left;
    }
  }

  .vc-dialog.skin_ios_native {
    background: #e8e8e8;
    border-radius: 7px;
    color: #3d4145;
    width: 75vw;

    &.vc-animation-init {
      opacity: 0;
      transform: scale(1.3) translateZ(0);
    }

    &.vc-animation-in {
      opacity: 1;
      transform: scale(1) translateZ(0);
      transition-duration: 400ms;
    }

    &.vc-animation-out {
      opacity: 0;
      transform: scale(0.7) translateZ(0);
      transition-duration: 400ms;
    }

    & .vc-dialog-footer {
      display: flex;
      text-align: right;
      font-size: 16px;
      height: 44px;
      align-items: center;
      justify-content: center;
      
      &:after{
        border-color: #b5b5b5;
      }
    }

    & .vc-dialog-head{
      font-weight: 500;
      font-size: 0.9rem;
      padding-top: 0.75rem;
      margin-bottom: -10px;
    }
    
    & .vc-dialog-btn {
      display: inline-block;
      vertical-align: top;
      padding: 0;
      height: 44px;
      line-height: 44px;
      text-align: center;

      & :last-child {
        margin-right: -.8em;
      }

      &:active{
        background-color: #d4d4d4;
      }

      &:after{
        border-color: #b5b5b5;
      }
    }

    & .vc-dialog-btn_default {
      color: #0bb20c;
    }

    & .vc-dialog-body {
      color: #999;
      padding: 0.75rem;
      min-height: 0px;

      &:first-child {
        padding: 0.75rem;
        color: #353535;
      }
    }
  }

  .vc-dialog.skin_lol {
    position: relative;
    z-index: 0;
    box-shadow: 0px 0px 20px 2px #5f491e;
    overflow: visible;

    &.vc-animation-out {
      opacity: 0;
      transform: scale(1);
      transition-duration: 300ms;
    }

    & .vc-dialog-wrapper {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: #010913;
      border: 1.5px solid #5F491E;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    &::before{
      content: ' ';
      position: absolute;
      width: calc(100% - 17px * 2);
      height: calc(100% + 5px * 2);
      top: -5px;
      left: 17px;
      background-color: #5F491E;
      clip-path: polygon(
        3px 0,
        0 3px,
        0 calc(100% - 3px),
        3px 100%,
        calc(100% - 3px) 100%,
        100% calc(100% - 3px),
        100% 3px,
        calc(100% - 3px) 0
      );
    }

    &::after{
      content: ' ';
      position: absolute;
      width: calc(100% - 18.5px * 2);
      height: calc(100% + 3px * 2 );
      top: -3px;
      left: 18.5px;
      background-color: #010913;
      clip-path: polygon(
        3px 0,
        0 3px,
        0 calc(100% - 3px),
        3px 100%,
        calc(100% - 3px) 100%,
        100% calc(100% - 3px),
        100% 3px,
        calc(100% - 3px) 0
      );
    }

    & .vc-dialog-footer{
      justify-content: center;
    }

    & .vc-dialog-btn{
      position: relative;
      bottom: -1.5px;
      flex: 0 0 auto;
      border: 3px solid;
      background-color: #1E2328;
      color: #CDBE91;
      text-align: center;
      display: inline-block;
      font-size: 15px;
      font-weight: 600;
      padding: 4px 15px;
      line-height: initial;
      margin: 0 3px;
      border-image: linear-gradient( #C8AA6D , #C69B3C , #7B5D29) 1;
    }

    & .vc-dialog-footer:after{
      content: none;
    }

    & .vc-dialog-btn:after,
    & .vc-dialog-btn:before{
      content: ' ';
      position: absolute;
      height: 11px;
      width: 2.5px;
      background-color: #010913;
      bottom: -3px;
    }

    & .vc-dialog-btn:after{
      left: -7.5px;
      border-left: 2px solid #5F491E;
      transform: initial;
      top: unset;
    }

    & .vc-dialog-btn:before{
      right: -7.5px;
      border-right: 2px solid #5F491E;
    }

    & .vc-dialog-head{
      color: #C69B3C;
      padding: 1em 1.6em .5em;
    }

    & .vc-dialog-body {
      color: #d4b06a;
    }
  }

  .vc-dialog-effect-blur {
    -webkit-animation: skin_lol-turbulence-out 1s;
            animation: skin_lol-turbulence-out 1s;
  }
  @keyframes skin_lol-turbulence-out{
    0%{
      -webkit-filter: url('#skin_lol-turbulence-out');
      opacity: 1;
    }
    100%{
      -webkit-filter: none;
      opacity: 0;
    }
  }
</style>

