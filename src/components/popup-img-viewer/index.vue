<template>
  <vc-swipe class="vc-img-viewer-swipe addWeight" overflow="backDrag" :gap="16" :continuous="loop" :defaultIndex="defaultIndex" ref="swiper">
    <vc-swipe-item v-for="(img, $index) in originalImgs" :key="$index">
      <div class="vc-img-viewer-swipe-wrapper" v-swipe:down="swipeConfig" @click="_controller.close()">
        <img class="vc-img-viewer-swipe-img" :src="img.src" alt="">
      </div>
    </vc-swipe-item>
  </vc-swipe>
</template>

<script>
  import VcSwipe from '../swipe'
  import VcSwipeItem from '../swipe-item'
  import swipeDirective from '../../mixins/event/swipe.js'

  export default {
    name: 'vc-popup-img-viewer',

    data () {
      return {
        defaultIndex: 0,
        originalImgs: []
      }
    },

    components: {
      VcSwipe,
      VcSwipeItem
    },

    props: {
      e: {
        default: null
      },
      imgs: {
        type: [Array, HTMLCollection],
        required: true
      },
      loop: {
        type: Boolean,
        default: false
      }
    },

    created () {
      this.event = {
        beforeEnter: () => {
          var $onSwipeImg = this._getSwipeImg(this.defaultIndex)

          var {clipTop, clipLeft, clipBottom, clipRight, clipRadius, translateX, translateY, scale, hasClip} = this._getAnimationSettings(this.defaultIndex)

          this._controller.vm_popUp.setAnimateDom($onSwipeImg)
          this._initPosition()

          $onSwipeImg.style.transform =
            `translate3d(${translateX}px, ${translateY}px,0) scale(${scale})`

          if (hasClip)
            $onSwipeImg.style.clipPath =
              `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round ${clipRadius})`

          requestAnimationFrame(() => {
            $onSwipeImg.style.transform = `translate3d(0,0,0) scale(1)`
            if (hasClip)
              $onSwipeImg.style.clipPath = `inset(0px 0px 0px 0px round 0px)`

            setTimeout(() => {
              this._controller.vm_popUp.maskOpacity(1)
            }, 0)
          })
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var index = this.$refs.swiper.index,
            $onSwipeImg = this._getSwipeImg(index)

          var {clipTop, clipLeft, clipBottom, clipRight, clipRadius, translateX, translateY, scale, hasClip} = this._getAnimationSettings(index)

          this._controller.vm_popUp.setAnimateDom($onSwipeImg)

          if (hasClip)
            $onSwipeImg.style.clipPath = `inset(0px 0px 0px 0px round 0px)`

          requestAnimationFrame(() => {
            $onSwipeImg.style.transform =
            `translate3d(${translateX}px, ${translateY}px,0) scale(${scale})`
            if (hasClip)
              $onSwipeImg.style.clipPath =
                `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round ${clipRadius})`
          })
        },
        afterLeave: () => {}
      }

      this.swipeConfig = {
        onSwipe: this._onItemSwipe,
        onSwipeDone: this._onItemSwipeDone
      }
    },

    mounted () {
      var e = this.e,
        self = this,
        defaultIndex

      this.originalImgs = this.imgs
      this.wHeight = window.innerHeight
      this.wWidth = window.innerWidth
      this.wRotaio = this.wWidth / this.wHeight
      this.status = {
        initLock: false,
        swipeStartX: null,
        swipeStartY: null
      }

      if (e.targetChangeTo)
        defaultIndex = Array.prototype.indexOf.call(this.originalImgs, e.targetChangeTo)
      else
        defaultIndex = Array.prototype.indexOf.call(this.originalImgs, e.target)

      if (defaultIndex === -1) {
        console.log('popup-img-viewer open的时候指定的img不在所导入的列表当中,检查传递的是否正确~')
        defaultIndex = 0
      }
      this.defaultIndex = defaultIndex

      //关联源img的src,这个传参的问题,唉不方便啊
      this._syncImgSrc = function () {
        var $originImg = this
        var index = Array.prototype.indexOf.call(self.originalImgs, $originImg)
        var $showImg = self._getSwipeImg(index)

        $showImg.setAttribute('src', $originImg.getAttribute('src'))
        self._initPosition(index)
      }
      Array.prototype.forEach.call(this.imgs, $img => {
        $img.addEventListener('load', this._syncImgSrc)
      })
    },

    methods: {
      _getAnimationSettings (index) {
        var wHeight = this.wHeight,
          wWidth = this.wWidth,
          wRotaio = this.wRotaio,

          scale, translateX, translateY,
          triggeredImgCenterX, triggeredImgCenterY,
          zoomedImgCenterX, zoomedImgCenterY,
          clipTop, clipRight, clipBottom, clipLeft, clipRadius,
          hasClip, clipRightVals,

          $img = this.originalImgs[index],
          iRatio = $img.naturalWidth / $img.naturalHeight,
          imgRect = $img.getBoundingClientRect(),
          contianerRect = $img.parentElement.getBoundingClientRect(),
          containerStyle = getComputedStyle($img.parentElement)

        //生成开始位置
        scale = imgRect.width / wWidth
        zoomedImgCenterX = wWidth / 2
        zoomedImgCenterY = (iRatio > wRotaio) ? wHeight / 2 : wWidth / iRatio / 2
        triggeredImgCenterX = imgRect.left + imgRect.width / 2
        triggeredImgCenterY = imgRect.top + imgRect.height / 2

        //然后做动画偏移, 需要区分布局偏移
        translateX = triggeredImgCenterX - zoomedImgCenterX
        translateY = triggeredImgCenterY - zoomedImgCenterY

        //设置clip-path
        clipTop = contianerRect.top - imgRect.top
        clipLeft = contianerRect.left - imgRect.left
        clipBottom = imgRect.bottom - contianerRect.bottom
        clipRight = imgRect.right - contianerRect.right
        clipRadius = containerStyle.borderRadius

        clipTop = clipTop > 0 ? clipTop / scale : 0
        clipLeft = clipLeft > 0 ? clipLeft / scale : 0
        clipBottom = clipBottom > 0 ? clipBottom / scale : 0
        clipRight = clipRight > 0 ? clipRight / scale : 0

        //clipRadius放大麻烦一丢丢,仅仅px,先是最简单版本
        clipRightVals = clipRadius.split(' ')

        clipRightVals.forEach((val, i) => {
          //提取数值
          var num = parseFloat(val)
          var unit = val.replace(num.toString(), '')

          if (unit !== '%') {
            num /= scale
            clipRightVals[i] = num + unit
          }
        })
        clipRadius = clipRightVals.join(' ')

        hasClip = clipTop !== 0 || clipLeft !== 0 ||
                  clipBottom !== 0 || clipRight !== 0 || clipRadius !== '0px'

        return {
          clipTop: clipTop,
          clipLeft: clipLeft,
          clipBottom: clipBottom,
          clipRight: clipRight,
          clipRadius: clipRadius,
          translateX: translateX,
          translateY: translateY,
          scale: scale,
          hasClip: hasClip
        }
      },

      _getSwipeImg (index) {
        return this.$refs.swiper.$refs.swipeItems.children[index].children[0].children[0]
      },

      _initPosition (index) {
        var i, iRatio, iHeight, iWidth, $img, $imgZoom, fromTop,
          wHeight = this.wHeight,
          wWidth = this.wWidth,
          wRotaio = this.wRotaio

        var ajustOne = i => {
          $img = this.originalImgs[i]
          $imgZoom = this._getSwipeImg(i)
          iHeight = $img.naturalHeight
          iWidth = $img.naturalWidth
          iRatio = iWidth / iHeight

          //生成结束位置
          if (iRatio > wRotaio) {
            //设置垂直居中
            fromTop = (wHeight - (wWidth / iWidth) * iHeight) / 2
          } else {
            // 设置自然布局
            fromTop = 0
            $imgZoom.overHeight = true
          }

          //设置的是swiper里面的图片
          $imgZoom.style.top = fromTop + 'px'
          $imgZoom.style.clipPath = `inset(0px 0px 0px 0px 0px)`
        }

        if (index !== undefined)
          ajustOne(index)
        else
          for (i = 0; i < this.originalImgs.length; i++)
            ajustOne(i)

        $img = null
      },

      _onItemSwipe (info, preventDefault) {
        var scale, transformOrgin, x, y,
          $item = info.element,
          $img = $item.children[0]

        if ($item.scrollTop !== 0) {
          this.swipeStartX = info.movingX
          this.swipeStartY = info.movingY
          return
        }

        preventDefault()

        y = info.movingY - (this.swipeStartY || info.startY)
        x = info.movingX - (this.swipeStartX || info.startX)

        if (info.directionFour === 'down')
          scale = 1 - (y / this.wWidth)
        else
          scale = 1

        if ($img.overHeight)
          transformOrgin = 'center 17%'

        if (!this.status.initLock) {
          this.status.initLock = true
          $img.style.transitionDuration = '0ms'
          this._controller.vm_popUp.trunOffMaskTransition()
          $img.style['transform-origin'] = transformOrgin
          $item.style['overflow'] = 'hidden'
        }

        requestAnimationFrame(() => {
          $img.style.setProperty(
            'transform',
            'translate3d(' + x + 'px,' + y + 'px,0) scale(' + scale + ')',
            'important'
          )
          this._controller.vm_popUp.maskOpacity(scale)
        })
      },

      _onItemSwipeDone (info) {
        var $item = info.element,
          $img = $item.children[0],
          y = info.movingY - (this.swipeStartY || info.startY)

        this.status.initLock = false
        this.swipeStartX = null
        this.swipeStartY = null

        requestAnimationFrame(() => {
          $img.style.transitionDuration = null
          this._controller.vm_popUp.trunOnMaskTransition()
          $img.style['transform-origin'] = null
          $img.style.transform = null
          this._controller.vm_popUp.maskOpacity(1)
        })

        if (info.directionFour === 'down' && y >= 284 / 3 && $item.scrollTop === 0) {
          this._controller.close()
        } else {
          $item.style.overflow = null
        }
      }
    },

    destory () {
      this.imgs.forEach($img => {
        $img.removeEventListener('load', this._syncImgSrc)
      })
    },

    directives: {
      swipe: swipeDirective
    }
  }
</script>

<style lang="scss">
  .vc-img-viewer-swipe.addWeight{
    height: 100vh;
    width: 100vw;
  }

  .vc-img-viewer-swipe-img{
    width: 100vw;
    position: absolute;
    transition: all 270ms ease;
    will-change: transform, opacity;
  }

  .vc-img-viewer-swipe-wrapper{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    position: absolute;
  }
</style>
