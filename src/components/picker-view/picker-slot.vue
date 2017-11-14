<template>
  <div class="vc-picker-group" v-if="!divider">
    <div class="vc-picker-mask" ref="mask"></div>
    <div class="vc-picker-indicator" ref="indicator"></div>
    <div class="vc-picker-content" ref="listWrapper">
      <div class="vc-picker-item" :class="{ 'vc-picker-item_disabled': typeof item === 'object' && item['disabled'] }" v-for="(item, key, index) in mutatingValues" :key="key">{{ typeof item === 'object' && item[labelKey] ? item[labelKey] : item }}</div>
    </div>
  </div>
  <div class="vc-picker-slot-divider" v-else v-html="content"></div>
</template>

<script>
  import draggable from '../../utils/draggable.js'
  import Transform from 'css3transform'
  import emitter from '../../mixins/emitter'

  export default {
    name: 'vc-picker-slot',

    mixins: [emitter],

    props: {
      values: {
        type: Array,
        default () {
          return []
        }
      },
      value: {},
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
      showItemHeight: Number,
      content: {}
    },

    created () {
      this.dragState = {}
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
        if(this.currentValue instanceof Object){
          //写个顺序查找好了
          for(var i = 0, len = this.mutatingValues.length; i < len ; i++){
            if(this.currentValue[labelKey] === this.mutatingValues[i][labelKey])
              return i
          }
          return -1
        }else
          return this.mutatingValues.indexOf(this.currentValue)
      }
    },

    mounted () {
      this.ready = true
      this.currentValue = this.value
      this.$emit('input', this.currentValue)

      if (this.divider) return

      const wrapper = this.$refs.listWrapper
      const $indicator = this.$refs.indicator
      const $mask = this.$refs.mask
      Transform(wrapper, true)

      //初始化indicator的位置
      $indicator.style.top = 
        (this.showItemHeight * this.showItemNum - 34) / 2 + 'px'
      
      $mask.style.top = 
        (this.showItemHeight * this.showItemNum - 238) / 2 + 'px'

      this.doOnValueChange()

      draggable(this.$el, {
        start: (event) => {
          let dragState = this.dragState

          dragState.start = new Date()
          dragState.startPositionY = event.clientY
          dragState.startTranslateY = wrapper.translateY

          wrapper.style.transition = null
        },
        drag: (event) => {
          let dragState = this.dragState
          const deltaY = event.clientY - dragState.startPositionY

          wrapper.translateY = dragState.startTranslateY + deltaY
          dragState.currentPosifionY = event.clientY
          dragState.currentTranslateY = wrapper.translateY
          dragState.velocityTranslate = 
            dragState.currentTranslateY - dragState.prevTranslateY
          dragState.prevTranslateY = dragState.currentTranslateY
        },
        end: (event) => {
          let dragState = this.dragState
          let momentumRatio = 7
          let currentTranslate = wrapper.translateY
          let duration = new Date() - dragState.start
          let distance = Math.abs(dragState.startTranslateY - currentTranslate)

          let rect, offset
          if(distance < 6){
            rect = $indicator.getBoundingClientRect()
            offset = Math.floor((event.clientY - rect.top)/this.showItemHeight) * this.showItemHeight
            
            if(offset > this.maxTranslateY )
              offset = this.maxTranslateY
            
            dragState.velocityTranslate = 0
            currentTranslate -= offset
          }

          let momentumTranslate
          if (duration < 300) {
            momentumTranslate = currentTranslate + dragState.velocityTranslate * momentumRatio
          }

          wrapper.style.transition = 'all 200ms ease'

          this.$nextTick(() => {
            let translate
            if (momentumTranslate) {
              translate = Math.round(momentumTranslate / this.showItemHeight) * this.showItemHeight
            } else {
              translate = Math.round(currentTranslate / this.showItemHeight) * this.showItemHeight
            }

            translate = Math.max(Math.min(translate, this.maxTranslateY), this.minTranslateY)

            wrapper.translateY = translate
            this.currentValue = this.translate2value(translate)
          })
          this.dragState = {}
        }
      })
    },

    methods: {
      value2translate (value) {
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
        let value = val || this.currentValue
        let wrapper = this.$refs.listWrapper

        if (this.divider) return

        wrapper.translateY = this.value2translate(value)
      },

      nearby (val, values){
        var minOffset,  minIndex, offset

        if(Array.isArray(values) === false) 
          return undefined
        
        minIndex = 0
        if(typeof val === 'number'){
          minOffset = Math.abs(values[0] - val)

          values.forEach((value, i)=>{
            offset = Math.abs(value - val)
            if(offset < minOffset){
              minIndex = i
              minOffset = offset
            }
          })
          return values[minIndex]
        }else if(val instanceof Object){
          if(typeof val.value === 'number'){
            minOffset = Math.abs(values[0].value - val.value)

            values.forEach((value, i)=>{
              offset = Math.abs(value.value - val.value)
              if(offset < minOffset){
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
        this.dispatch('vc-picker-view', 'slotValueChange', this)
      }
    }
  }
</script>

<style scoped lang="scss">
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
