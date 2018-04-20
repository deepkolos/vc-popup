<template>
  <div class="vc-swipe">
    <div class="vc-swipe-wrapper" v-swipe:horizonal.lock="swipeConfig">
      <div class="vc-swipe-items" ref="swipeItems">
        <slot></slot>
      </div>
    </div>
    <div class="vc-swipe-indicators" v-show="showIndicators" ref="swipeIndicators">
      <slot name="indicator"></slot>
    </div>
  </div>
</template>

<script>
  import { once } from '../../utils/dom.js'
  import { swipeDirective } from 'vue-swipe-directive'

  export default {
    name: 'vc-swipe',

    created () {
      this.info = null
      this.dom = {
        $pages: null,
        $pageContainer: null,
        $indicators: null,
        $indicatorContainer: null,
        itemWidth: null,
        actualSwipeValue: null,
        speedAjustRange: 100
      }
      this.status = {
        initLocker: false,
        rafLocker: false,
        edgeLocker: false,
        swipeCurrentOffset: null,
        swipeStartOffset: null,
        activatedClass: 'is-active',
        swipeStartTime: null
      }
      this.swipeConfig = {
        move: this.onSwipe,
        end: this.onSwipeDone
      }
      this.swipeItemMounted = 0
    },

    data () {
      return {
        ready: false,
        dragging: false,
        animating: false,
        index: 0,
        timer: null,
        reInitTimer: null
      }
    },

    props: {
      speed: {
        type: Number,
        default: 280
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      auto: {
        type: Number,
        default: 0
      },
      continuous: {
        type: Boolean,
        default: false
      },
      showIndicators: {
        type: Boolean,
        default: true
      },
      noDragWhenSingle: {
        type: Boolean,
        default: true
      },
      prevent: {
        type: Boolean,
        default: false
      },

      //新增的
      gap: {
        type: Number,
        default: 0
      },
      itemWidth: {
        type: Number,
        default: null
      },
      overflow: {
        type: String,
        default: 'default'
      },
      onSwitch: {
        type: Function,
        default: null
      },
      swipeItemLen: {
        type: Number,
        default: null
      }
    },

    mounted () {
      this.ready = true
      this.setTimer()
      window.addEventListener('resize', this.reSize)
      this.dom.$pageContainer = this.$refs.swipeItems
      this.dom.$indicatorContainer = this.$refs.swipeIndicators

      this.reInitPages()
    },

    methods: {
      swipeItemCreated () {
        this.swipeItemMounted++
        if (!this.ready) return

        if (this.swipeItemLen === null) {
          clearTimeout(this.reInitTimer)
          this.reInitTimer = setTimeout(() => {
            this.reInitPages()
          }, 20)
        } else

        if (this.swipeItemLen === this.swipeItemMounted) {
          this.reInitPages()
        }
      },

      swipeItemDestroyed () {
        this.swipeItemMounted--
        if (!this.ready) return

        if (this.swipeItemLen === null) {
          clearTimeout(this.reInitTimer)
          this.reInitTimer = setTimeout(() => {
            this.reInitPages(true)
          }, 20)
        } else

        if (this.swipeItemLen === this.swipeItemMounted) {
          this.reInitPages()
        }
      },

      reInitPages () {
        this.dom.$pages = this.dom.$pageContainer.children
        this.dom.$indicators = this.dom.$indicatorContainer.children

        this.index = (
            this.defaultIndex >= 0 &&
            this.defaultIndex < this.dom.$pages.length
          ) ? this.defaultIndex : 0

        this.reSize()
      },

      reSize () {
        var self = this
        var gap = this.gap
        var index = this.index
        var $pages = this.dom.$pages
        var actualSwipeValue, itemWidth
        var continuous = this.continuous
        var $swiper = this.$el.children[0]
        var $indicators = this.dom.$indicators
        var $pageContainer = this.dom.$pageContainer

        requestAnimationFrame(() => {
          itemWidth = this.dom.itemWidth = this.itemWidth || $swiper.clientWidth
          actualSwipeValue = this.dom.actualSwipeValue = this.dom.itemWidth + gap
          this.status.swipeStartOffset = index * actualSwipeValue

          $pages[index].classList.add(self.status.activatedClass)
          $indicators[index] && $indicators[index].classList.add(self.status.activatedClass)

          $pageContainer.style.width = ($pages.length * actualSwipeValue) + 'px'
          Array.prototype.forEach.call($pages, function ($page) {
            $page.style.width = itemWidth + 'px'
            $page.style.marginRight = gap + 'px'
          })

          if (continuous) {
            $swiper.classList.add('loop')
            Array.prototype.forEach.call($pages, function ($page, i) {
              $page.currentPosition = i * itemWidth
              $page.index = i
              $page.style.webkitTransform = 'translate3d(' + $page.currentPosition + 'px,0,0)'
            })
          }

          self.goTo(index, true)
        })
      },

      goTo (page, immediately) {
        var fromPage = this.index
        var $pages = this.dom.$pages
        var self = this

        if (page === 'next')
          page = this.index + 1
        else if (page === 'prev')
          page = this.index - 1

        if (!this.continuous) {
          if (page > $pages.length - 1 || page < 0) return
        } else {
          if (page > $pages.length - 1) page = 0
          if (page < 0) page = $pages.length - 1
        }

        this.index = page
        this.status.swipeStartOffset = page * this.dom.actualSwipeValue

        if (immediately)
          self.noAnimate(fromPage, page)
        else
          self.animate(fromPage, page)
      },

      next () {
        this.goTo('next')
      },

      prev () {
        this.goTo('prev')
      },

      clearTimer () {
        clearInterval(this.timer)
        this.timer = null
      },

      setTimer () {
        if (this.auto > 0) {
          this.timer = setInterval(() => {
            if (!this.continuous && (this.index >= this.dom.$pages.length - 1)) {
              return this.clearTimer()
            }
            if (!this.dragging && !this.animating) {
              this.next()
            }
          }, this.auto)
        }
      },

      onSwipe (info) {
        var $pageContainer = this.dom.$pageContainer,
          $pages = this.dom.$pages,
          continuous = this.continuous,
          actualSwipeValue = this.dom.actualSwipeValue,
          handleOverflow = this.handleOverflow,
          self = this,

          offset = self.status.swipeStartOffset - info.offset,
          indexTo = (info.offset > 0) ? this.index - 1 : this.index + 1,
          indexFrom = this.index,
          maxOffset = ($pages.length - 1) * actualSwipeValue,
          needPass = false

        // 更新状态
        this.dragging  = true
        this.animating = false

        // 修正
        if (indexTo < 0) indexTo = $pages.length - 1
        if (indexTo > $pages.length - 1) indexTo = 0
        if (self.status.edgeLocker === 1) return

        if (offset < 0) {
          offset = 0
          needPass = true
        } else if (offset > maxOffset) {
          offset = maxOffset
          needPass = true
        }
        self.status.swipeCurrentOffset = offset

        if (!self.status.rafLocker) {
          self.status.rafLocker = true
          requestAnimationFrame(function () {
            if (!self.status.initLocker) {
              self.status.initLocker = true

              if (continuous)
                $pageContainer.classList.add('subNoneAnimation')
              else
                $pageContainer.classList.add('noneAnimation')

              self.status.swipeStartTime = Date.now()
            }
            if (continuous) {
              Array.prototype.forEach.call($pages, function ($li) {
                $li.style.webkitTransform =
                  `translate3d(${$li.currentPosition + info.offset}px,0,0)`
              })
            } else {
              $pageContainer.style.webkitTransform =
                `translate3d(${-offset}px,0,0)`
            }

            self.indicatorOnSwipe instanceof Function && self.indicatorOnSwipe({
              $form: self.dom.$indicators[indexFrom],
              $to: self.dom.$indicators[indexTo],
              from: indexFrom,
              to: indexTo,
              percentage: Math.abs(info.offset / self.itemWidth)
            })

            self.status.rafLocker = false
          })
        }
        if (needPass && !continuous) return handleOverflow(info)
      },

      onSwipeDone (info) {
        var self = this
        var needPass = false
        var $pages = this.dom.$pages
        var continuous = this.continuous
        var itemWidth = this.dom.itemWidth
        var actualSwipeValue = this.dom.actualSwipeValue

        var maxOffset = ($pages.length - 1) * actualSwipeValue
        var indexFrom = this.index
        var indexTo = indexFrom

        // 状态更新
        this.dragging = false
        this.animating = true

        if (self.status.edgeLocker === 1) return

        if (Math.abs(info.offset) / itemWidth > 0.15 &&
          self.status.swipeCurrentOffset <= maxOffset &&
          self.status.swipeCurrentOffset >= 0
        ) {
          if (info.offset > 0) {
            if (self.index !== 0 || continuous)
              self.index--
            else
              needPass = true
          } else {
            if (self.index < $pages.length - 1 || continuous)
              self.index++
            else
              needPass = true
          }

          indexTo = (info.offset > 0) ? indexFrom - 1 : indexFrom + 1
        } else
          needPass = true

        if (continuous) {
          if (indexTo < 0) {
            indexTo = $pages.length - 1
            self.status.edgeLocker++
          } else if (indexTo > $pages.length - 1) {
            indexTo = 0
            self.status.edgeLocker++
          }
        } else if (indexTo < 0 || indexTo > $pages.length - 1)
          indexTo = indexFrom

        if (indexTo === indexFrom)
          this.animate(indexFrom, indexTo)
        else
          this.animate(indexFrom, indexTo, info)

        this.indicatorOnSwipe instanceof Function && this.indicatorOnSwipe({
          $form: self.dom.$indicators[indexFrom],
          $to: self.dom.$indicators[indexTo],
          from: indexFrom,
          to: indexTo
        })
        if (needPass && !continuous) return needPass
      },

      transitionendProcessor () {
        this.clearTimer()
        this.setTimer()
        this.animating = false
        this.dom.$pageContainer.removeEventListener('transitionend', this.transitionendProcessor)
      },

      animate (indexFrom, indexTo, info) {
        var self = this
        var $pages = this.dom.$pages
        var continuous = this.continuous
        var speed = this.ajustSpeed(info)
        var $pageContainer = this.dom.$pageContainer
        var actualSwipeValue = this.dom.actualSwipeValue

        $pageContainer.addEventListener('transitionend', self.transitionendProcessor)

        self.status.swipeStartOffset = self.index * actualSwipeValue
        requestAnimationFrame(function () {
          if (!continuous) {
            $pageContainer.classList.remove('noneAnimation')
            $pageContainer.style['transform'] =
              'translate3d(' + -self.status.swipeStartOffset + 'px,0,0)'
            $pageContainer.style.webkitTransition =
              `-webkit-transform ${speed}ms ease`
          } else {
            var _loop = function (reset) {
              if (!reset) $pageContainer.classList.remove('subNoneAnimation')

              Array.prototype.forEach.call($pages, function ($li, i) {
                $li.classList.add('noneAnimation')
                $li.currentPosition =
                  ($li.index - self.index) * actualSwipeValue
                $li.style.webkitTransform =
                  'translate3d(' + $li.currentPosition + 'px,0,0)'
                $li.style.webkitTransition =
                  `-webkit-transform ${speed}ms ease`

                if (i === indexTo || i === indexFrom)
                  $li.classList.remove('noneAnimation')
              })

              //如果是确认到达边缘修把另一头挪过来,这里重构一下
              function switchTo (where) {
                var i, currentPosition
                if (where === 'tial') {
                  i = $pages.length - 1
                  currentPosition = (-1 - self.index) * actualSwipeValue
                } else if (where === 'head') {
                  i = 0
                  currentPosition = ($pages.length - self.index) * actualSwipeValue
                }

                $pages[i].classList.add('noneAnimation')
                $pages[i].currentPosition = currentPosition
                $pages[i].style.webkitTransform = 'translate3d(' + $pages[i].currentPosition + 'px,0,0)'
                requestAnimationFrame(function () {
                  $pages[i].classList.remove('noneAnimation')
                })
              }

              if (self.index === 0)
                switchTo('tial')
              else if (self.index === $pages.length - 1)
                switchTo('head')

              //溢出重置处理
              var animationEnd = function () {
                requestAnimationFrame(function () {
                  $pageContainer.classList.add('subNoneAnimation')

                  if (self.index > $pages.length - 1) {
                    self.index = 0
                    once($pages[0], 'transitionend', animationEnd)
                  } else if (self.index < 0) {
                    self.index = $pages.length - 1
                    once($pages[$pages.length - 1], 'transitionend', animationEnd)
                  }

                  Array.prototype.forEach.call($pages, function ($li) {
                    $li.currentPosition = ($li.index - self.index) * actualSwipeValue
                    $li.style.webkitTransform = 'translate3d(' + $li.currentPosition + 'px,0,0)'
                  })

                  _loop(true)

                  requestAnimationFrame(function () {
                    $pageContainer.classList.remove('subNoneAnimation')
                    self.status.edgeLocker = 0
                  })
                })
              }

              if (self.index > $pages.length - 1) {
                once($pages[0], 'transitionend', animationEnd.bind(null, info))
                $pages[0].classList.remove('noneAnimation')
                $pages[0].currentPosition =
                  ($pages.length - self.index) * actualSwipeValue
                $pages[0].style.webkitTransform =
                  'translate3d(' + $pages[0].currentPosition + 'px,0,0)'
              } else if (self.index < 0) {
                once($pages[$pages.length - 1], 'transitionend', animationEnd.bind(null, info))
                $pages[$pages.length - 1].classList.remove('noneAnimation')
                $pages[$pages.length - 1].currentPosition = (-1 - self.index) * actualSwipeValue
                $pages[$pages.length - 1].style.webkitTransform = 'translate3d(' + $pages[$pages.length - 1].currentPosition + 'px,0,0)'
              }
            }

            _loop()
          }

          //重置locker
          self.status.rafLocker = false
          self.status.initLocker = false

          indexFrom === indexTo && self.transitionendProcessor()
        })
      },

      noAnimate (indexFrom, indexTo) {
        var self = this
        var $pages = this.dom.$pages
        var continuous = this.continuous
        var $pageContainer = this.dom.$pageContainer
        var actualSwipeValue = this.dom.actualSwipeValue

        self.status.swipeStartOffset = self.index * actualSwipeValue

        if (!continuous) {
          $pageContainer.style['transform'] =
            'translate3d(' + -self.status.swipeStartOffset + 'px,0,0)'
          $pageContainer.style.webkitTransition =
            `-webkit-transform 0ms ease`
        } else {
          Array.prototype.forEach.call($pages, function ($li, i) {
            $li.currentPosition =
              ($li.index - self.index) * actualSwipeValue
            $li.style.webkitTransform =
              'translate3d(' + $li.currentPosition + 'px,0,0)'
            $li.style.webkitTransition =
              `-webkit-transform 0ms ease`
          })
        }

        self.transitionendProcessor()
      },

      handleOverflow (info) {
        var type = this.overflow

        if (type === 'backDrag')
          this.overflowBackDrag(info)

        return true
      },

      overflowBackDrag (info) {
        var x = 288 / 3 / 360,
          speed = this.speed || 280 // 默认为微信的转换比例

        x = -this.status.swipeStartOffset + info.offset * x

        requestAnimationFrame(() => {
          this.dom.$pageContainer.style.webkitTransform =
            'translate3d(' + x + 'px,0,0)'
          this.dom.$pageContainer.style.webkitTransition =
            `-webkit-transform ${speed}ms ease`
        })

        return true
      },

      updateIndex (val, oVal) {
        var max = this.dom.$pages.length - 1

        if (val >= 0 && val <= max) {
          if (oVal < 0) oVal = max
          if (oVal > max) oVal = 0

          this.dom.$pages[val].classList.add(this.status.activatedClass)
          this.dom.$pages[oVal].classList.remove(this.status.activatedClass)

          this.dom.$indicators[val] && this.dom.$indicators[val].classList.add(this.status.activatedClass)
          this.dom.$indicators[oVal] && this.dom.$indicators[oVal].classList.remove(this.status.activatedClass)

          this.dom.$pages[val] &&
            this.dom.$pages[val].__vue__ &&
              this.dom.$pages[val].__vue__.onEnter instanceof Function &&
                this.dom.$pages[val].__vue__.onEnter[val]()

          this.dom.$pages[oVal] &&
            this.dom.$pages[oVal].__vue__ &&
              this.dom.$pages[oVal].__vue__.onLeave instanceof Function &&
                this.dom.$pages[oVal].__vue__.onLeave[oVal]()

          this.dom.$indicators[val] &&
            this.dom.$indicators[val].__vue__ &&
              this.dom.$indicators[val].__vue__.onEnter instanceof Function &&
                this.dom.$indicators[val].__vue__.onEnter[val]()

          this.dom.$indicators[oVal] &&
            this.dom.$indicators[oVal].__vue__ &&
              this.dom.$indicators[oVal].__vue__.onLeave instanceof Function &&
                this.dom.$indicators[oVal].__vue__.onLeave[oVal]()

          this.onSwitch instanceof Function &&
            this.onSwitch(val, oVal)
        }
      },

      ajustSpeed (info) {
        var speed = this.speed || 240
        var swipeTime = Date.now() - this.status.swipeStartTime
        var offsetToAnimate, swipeOffset, _speed
        // var speedOfAnimate, avgSwipeSpeed

        if (info) {
          swipeOffset = Math.abs(info.offset)
          offsetToAnimate = this.dom.itemWidth - swipeOffset
          // avgSwipeSpeed = swipeOffset / swipeTime
          // speedOfAnimate = offsetToAnimate * avgSwipeSpeed

          _speed = offsetToAnimate / (swipeOffset / swipeTime) * 1.2

          if (_speed > 1.6 * speed)
            _speed = 1.6 * speed

          if (_speed < 0.5 * speed)
            _speed = 0.5 * speed
          speed = _speed
        }

        return speed
      }
    },

    destroyed () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      if (this.reInitTimer) {
        clearTimeout(this.reInitTimer)
        this.reInitTimer = null
      }
    },

    watch: {
      index (val) {
        this.$emit('change', val)
        this.updateIndex.apply(this, arguments)
      }
    },

    directives: {
      swipe: swipeDirective
    }
  }
</script>

<style lang="scss">
  .vc-swipe {
    overflow: hidden;
    width: 100%;

    .vc-swipe-wrapper {
      height: 100%;

      .vc-swipe-items {
        height: 100%;
        overflow-y: hidden;
        will-change: transform;
        transition: all 0.2s ease 0s;

        div {
          position: relative;
          height: 100%;
          width:100vw;
          display: block;
          float: left;
          overflow-y: auto;
        }
      }

      &.loop .vc-swipe-items{
        will-change: unset;
        transition: none;
        position: relative;
        z-index: 0;

        div {
          will-change: transform;
          transition: all 0.2s ease 0s;
          position: absolute;
        }
      }
    }

    .vc-swipe-indicators {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      .vc-swipe-indicator {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin: 0 4px;
        background-color: #000;
        opacity: 0.3;

        &.is-active {
          background-color:#fff; 
        }
      }
    }

    & .noneAnimation , & .subNoneAnimation * {
      transition: none!important;
    }

    & *::-webkit-scrollbar{
      display: none;
    }
  }
</style>
