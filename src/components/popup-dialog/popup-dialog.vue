<template>
  <div class="vc-dialog" 
    :class="{ 
      'skin_android': skin === 'android',
      'skin_ios_native': skin === 'iosNative'
    }
  ">
    <div class="vc-dialog-head" v-if="title"><strong class="vc-dialog-title" v-html="title"></strong></div>
    <div class="vc-dialog-body" v-html="message"></div>
    <div class="vc-dialog-footer">
      <a class="vc-dialog-btn vc-dialog-btn_default" v-if="showCancelBtn"
          @click="cancelClick" v-text="cancelText"></a>
      <a class="vc-dialog-btn vc-dialog-btn_primary" v-if="showConfirmBtn"
          @click="confirmClick" v-text="confirmText"></a>
    </div>
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
      this.event = {
        beforeEnter: () => {
          var $el = this.$el;

          $el.classList.add('inital');
          requestAnimationFrame(() => {
            $el.classList.remove('inital');
            $el.classList.add('inAnimation');
            setTimeout(()=>{
              if(this.skin === 'iosNative')
                this._controller.vm_popUp.maskOpacity(0.4);
            }, 0)
          })
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var $el = this.$el;
          $el.classList.add('outAnimation');
          requestAnimationFrame(function(){
            $el.classList.remove('inAnimation');
          })
        },
        afterLeave: () => {},
      }
    },

    methods: {

      close (){
        this._controller.close();
      },

      confirmClick () {
        if(typeof this.onComfrim === 'function')
          this.onComfrim()
        this.close()
      },

      cancelClick () {
        if(typeof this.onCancel === 'function')
          this.onCancel()
        this.close()
      }

    }
  }
</script>

<style scoped lang="scss">
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

    &.inital {
      opacity: 0;
      transform: scale(0.9) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }

    &.outAnimation {
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
    display: -webkit-box;
    display: -webkit-flex;
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
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(.5);
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
    -webkit-box-flex: 1;
    -webkit-flex: 1;
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

  .skin_android {
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

  .skin_ios_native {
    background: #e8e8e8;
    border-radius: 7px;
    color: #3d4145;
    width: 75vw;

    &.inital {
      opacity: 0;
      transform: scale(1.3) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: scale(1) translateZ(0);
      transition-duration: 400ms;
    }

    &.outAnimation {
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
</style>

