<template>
  <div class="page" ref="page">
    <div class="btn" ref="btn16" @click="click">a custom popover under the example project</div>
  </div>
</template>

<script>
  import '../components/popup-custom'

  export default {
    mounted () {
      // 这里需要注意,this.$refs在mounted后才会初始化, 请不要在created时候使用
      this.popupCustom = new this.$popup.Custom({
        refDom: this.$refs.btn16,
        refCorner: 'top right',
        relativeToCorner: 'above before',
        propsData: {
          items: [
            {
              name: '自定义的popup',
              click: e => console.log('btn0 clicked'),
              src: 'http://gw.alipayobjects.com/zos/rmsportal/tOtXhkIWzwotgGSeptou.svg'
            }, {
              name: '二维码',
              click: e => this.popupCustom.close(e),
              src: 'http://gw.alipayobjects.com/zos/rmsportal/PKAgAqZWJVNwKsAJSmXd.svg'
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

