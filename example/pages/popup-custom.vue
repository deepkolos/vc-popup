<template>
  <div class="page" ref="page">
    <div class="btn" ref="btn16" @click="click">自定义的popup</div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VcPopupBase from 'vc-popup-base'
  import '../components/popup-custom'
  Vue.use(VcPopupBase)

  export default {
    mounted () {
      // 这里需要注意,this.$refs在mounted后才会初始化, 请不要在created时候使用
      this.popupCustom = new this.$popup.Custom({
        refDom: this.$refs.btn16,
        refCorner: 'top right',
        relativeToCorner: 'above before',
        className: ['test', 'test2'],
        maskOpacity: 0.5,
        maskBgColor: 'white',
        propsData: {
          items: [
            {
              name: '自定义的popup',
              click: e => console.log('btn0 clicked')
            }, {
              name: '关闭',
              click: e => this.popupCustom.close(e)
            }
          ]
        }
      })
    },

    methods: {
      click (e) {
        this.popupCustom.open(e)
      }
    }
  }
</script>

<style scoped>
  .btn{
    width: 200px;
    background: lightblue;
    margin: 40vh auto;
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
  }
</style>
<style>
  .test{
    background: red!important;
  }
</style>
