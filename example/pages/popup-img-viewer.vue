<template>
  <div class="page">
    <p class="cell">
      微信查看图片, 支持过度动画做边缘裁切, 显示更加自然<br><br>
      
    </p>
    <div class="row">
      <div class="row-item"><img :src="sample" alt=""></div>
      <div class="row-item"><img :src="logo" alt=""></div>
      <div class="row-item" @click="triggerNotOnImgTag"><img :src="logo" alt="" ref="imgTarget"></div>
    </div>

    <p class="cell"><br>
      目前支持:<br>
      左右滑动切换<br>
      下滑关闭<br>
      放大时,会同步更新src,支持懒加载图片
    </p>
  </div>
  
</template>

<script>
  import logo from '../assets/logo.png'
  import sample from '../assets/sample.jpg'

  export default {

    created () {
      this.logo = logo
      this.sample = sample
    },

    mounted () {
      var imgs = this.$el.getElementsByTagName('img')

      this.imgViwer = new this.$popup.ImgViewer({
        propsData: {
          imgs: imgs
        }
      })

      //添加事件
      Array.prototype.forEach.call(imgs, $img => {
        $img.addEventListener('click', e => {
          e.stopPropagation()
          //没办法了,现在想到只能这样来处理重复点击,就是并非内置
          this.imgViwer.open(e)
        })
      })

      setTimeout(() => {
        this.$refs.imgTarget.addEventListener('load', (e) => {
          console.log(e)
        })
        this.$refs.imgTarget.setAttribute('src', sample)
      }, 1000)
    },

    methods: {
      triggerNotOnImgTag (e) {
        //需要手动指定target
        e.targetChangeTo = this.$refs.imgTarget
        this.imgViwer.open(e)
      }
    }
  }
</script>

<style scoped>
  img{
    width: 100px;
  }

  .row{
    display: flex;
    justify-content: space-around;
  }
  .row-item{
    height: 80px;
    width: 80px;
    flex: 0 0 auto;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid black;
  }
  .cell{
    border: none;
  }
</style>

