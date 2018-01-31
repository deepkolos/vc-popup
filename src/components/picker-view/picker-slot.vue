<template>
  <div class="vc-picker-group" ref="group" v-if="!divider">
    <div class="vc-picker-mask" ref="mask"></div>
    <div class="vc-picker-indicator" ref="indicator"></div>
    <div class="vc-picker-content" ref="content">
      <div class="vc-picker-item"
        :class="{ 'vc-picker-item_disabled': typeof item === 'object' && item.disabled }"
        v-for="(item, key) in mutatingValues"
        :key="key"
      >
        {{ typeof item === 'object' && item[labelKey] ? item[labelKey] : item }}
        </div>
    </div>
  </div>
  <div class="vc-picker-slot-divider" v-else v-html="content"></div>
</template>

<script>
  export default {
    name: 'vc-picker-slot',

    props: {
      values: {
        type: Array,
        default () {
          return []
        }
      },
      value: {},
      content: String,
      labelKey: String,
      defaultIndex: {
        type: Number,
        default: 0
      },
      divider: {
        type: Boolean,
        default: false
      },
      showItemNum: Number,
      showItemHeight: Number
    },

    data () {
      return {
        currentValue: this.value,
        mutatingValues: this.values
      }
    },

    computed: {
      minTranslateY () {
        return this.showItemHeight * (Math.ceil(this.showItemNum / 2) - this.mutatingValues.length)
      },

      maxTranslateY () {
        return this.showItemHeight * Math.floor(this.showItemNum / 2)
      },

      valueIndex () {
        var labelKey = this.labelKey
        if (this.currentValue instanceof Object) {
          for (var i = 0, len = this.mutatingValues.length; i < len; i++) {
            if (this.currentValue[labelKey] === this.mutatingValues[i][labelKey])
              return i
          }
          return -1
        } else
          return this.mutatingValues.indexOf(this.currentValue)
      }
    },

    mounted () {
      this.ready = true
      this.currentValue = this.value
      this.$emit('input', this.currentValue)

      if (this.divider) return

      this.$refs.indicator.style.top =
        (this.showItemHeight * this.showItemNum - 34) / 2 + 'px'

      this.$refs.mask.style.backgroundSize =
        '100% ' + (this.showItemHeight * (this.showItemNum - 1)) / 2 + 'px'

      this.doOnValueChange()
      this.initListener()
    },

    methods: {
      initListener () {
        var self = this
        var $group = this.$refs.group
        var $content = this.$refs.content
        var $indicator = this.$refs.indicator
        var itemHeight = self.showItemHeight
        var minTranslateY = self.minTranslateY
        var maxTranslateY = self.maxTranslateY

        var lastEvt = null
        var startTime = null
        var startPositionY = null
        var prevTranslateY = null
        var startTranslateY = null
        var velocityTranslate = null

        $group.addEventListener('touchstart', function (evt) {
          lastEvt = evt
          startTime = new Date()
          startPositionY = evt.touches[0].clientY
          prevTranslateY = startTranslateY = self.currentTranslateY

          $content.style.transition = null
        })

        $group.addEventListener('touchmove', function (evt) {
          var deltaY = evt.touches[0].clientY - startPositionY
          var translateY = startTranslateY + deltaY

          if (translateY > maxTranslateY)
            translateY = (translateY - maxTranslateY) / 2 + maxTranslateY

          if (translateY < minTranslateY)
            translateY = (translateY - minTranslateY) / 2 + minTranslateY

          self.setTranslateY(translateY)
          velocityTranslate = translateY - prevTranslateY
          prevTranslateY = translateY
          lastEvt = evt
        })

        $group.addEventListener('touchend', function () {
          var momentumRatio = 7
          var translateY = self.currentTranslateY
          var duration = new Date() - startTime
          var distance = Math.abs(startTranslateY - translateY)
          var rect, offset, momentumTranslate

          if (distance < 6) {
            rect = $indicator.getBoundingClientRect()
            offset = Math.floor((lastEvt.touches[0].clientY - rect.top) / itemHeight) * itemHeight

            if (offset > maxTranslateY)
              offset = maxTranslateY

            velocityTranslate = 0
            translateY -= offset
          }

          if (duration < 300) {
            momentumTranslate =
              translateY + velocityTranslate * momentumRatio
          }

          $content.style.transition = 'transform 200ms ease'

          self.$nextTick(() => {
            var translate = momentumTranslate
              ? Math.round(momentumTranslate / itemHeight) * itemHeight
              : Math.round(translateY / itemHeight) * itemHeight

            translate = Math.max(Math.min(translate, maxTranslateY), minTranslateY)

            self.setTranslateY(translate)
            self.currentValue = self.translate2value(translate)
          })
        })
      },

      setTranslateY (val) {
        this.currentTranslateY = val
        this.$refs.content.style.transform = `translate3d(0, ${val}px, 0)`
      },

      value2translate () {
        const valueIndex = this.valueIndex
        const offset = Math.floor(this.showItemNum / 2)

        if (valueIndex !== -1) {
          return (valueIndex - offset) * -this.showItemHeight
        }
      },

      translate2value (translate) {
        translate = Math.floor(translate / this.showItemHeight) * this.showItemHeight
        const index = -(translate - Math.floor(this.showItemNum / 2) * this.showItemHeight) / this.showItemHeight

        return this.mutatingValues[index]
      },

      doOnValueChange (val) {
        if (this.divider) return

        this.setTranslateY(
          this.value2translate(val || this.currentValue))
      },

      nearby (val, values) {
        var minOffset, minIndex, offset

        if (Array.isArray(values) === false)
          return undefined

        minIndex = 0
        if (typeof val === 'number') {
          minOffset = Math.abs(values[0] - val)

          values.forEach((value, i) => {
            offset = Math.abs(value - val)
            if (offset < minOffset) {
              minIndex = i
              minOffset = offset
            }
          })
          return values[minIndex]
        } else if (val instanceof Object) {
          if (typeof val.value === 'number') {
            minOffset = Math.abs(values[0].value - val.value)

            values.forEach((value, i) => {
              offset = Math.abs(value.value - val.value)
              if (offset < minOffset) {
                minIndex = i
                minOffset = offset
              }
            })
            return values[minIndex]
          }
        }
        return values[0]
      }
    },

    watch: {
      values (val) {
        this.mutatingValues = val
      },

      mutatingValues (val) {
        if (this.valueIndex === -1) {
          this.currentValue = this.nearby(this.currentValue, val)
        }
      },

      currentValue (val) {
        this.doOnValueChange()
        this.$emit('input', val)
        this.$parent.slotValueChange()
      }
    }
  }
</script>

<style lang="scss">
  .vc-picker-group{
    z-index: 0;
    overflow: hidden;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    position: relative;
    height: 100%;
  }

  .vc-picker-mask{
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    background: -webkit-linear-gradient(top,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),-webkit-linear-gradient(bottom,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
    background: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
    background-position: top,bottom;
    background-size: 100% 102px;
    background-repeat: no-repeat;
  }
  .vc-picker-indicator{
    z-index: 3;
    height: 34px;

    &:after,
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      color: #e5e5e5;
    }

    &:before{
      top: 0;
      border-top: 1px solid #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }

    &:after {
      bottom: 0;
      border-bottom: 1px solid #e5e5e5;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }

  .vc-picker-content{
    z-index: 1;
    top: 0;
  }
  .vc-picker-item {
    padding: 0;
    height: 34px;
    line-height: 34px;
    text-align: center;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .vc-picker-indicator,
  .vc-picker-mask,
  .vc-picker-content{
    position: absolute;
    left: 0;
    width: 100%;
  }

  .vc-picker-slot-divider {
    transform:translateY(106px);
  }
</style>
