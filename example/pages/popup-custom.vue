<template>
  <div class="page" ref="page">
    <div class="btn" ref="btn16" @click="click16">custom popover</div>
  </div>
</template>

<script>
  import popupCustom from '../components/popup-custom'
  
  export default {

    data () {
      return {
        
      }
    },

    mounted () {
      //这里需要注意refs在mounted才能获得引用
      this.popupCustom = new this.popup.custom({
        refDom: this.$refs.btn16,
        refCorner: 'top right',
        relativeToCorner: 'above before',
        propsData: {
          items: [
            {
              name: '自定义的popup',
              click: e => {console.log('btn0 clicked');},
              src: 'https://gw.alipayobjects.com/zos/rmsportal/tOtXhkIWzwotgGSeptou.svg'
            },{
              name: '二维码',
              click: e => {this.popupOver.close(e)},
              src: 'https://gw.alipayobjects.com/zos/rmsportal/PKAgAqZWJVNwKsAJSmXd.svg'
            }
          ]
        }
      })
    },

    methods: {
      click16 (e){
        this.popupCustom.open(e);
      }
    },

    filters: {
      
    }
  }
</script>

<style scoped>
  .btn{
    width: 160px;
    height: 30px;
    background: lightblue;
    margin: 40vh auto;
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
  }
</style>

