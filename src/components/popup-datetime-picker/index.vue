<template>
  <div class="vc-picker">
    <div class="vc-picker-head">
      <a class="vc-picker-action noExpand" @click="_cancel" v-text="cancelText"></a>
      <a class="vc-picker-action"></a>
      <a class="vc-picker-action noExpand" @click="_confirm" v-text="confirmText"></a>
    </div>
    <vc-picker-view 
      :slots="slots" 
      :onChange="_onChange"
      :defaultValues="defaultValues"
      :showItemNum="showItemNum"
      :showItemHeight="showItemHeight"
      ref="picker"
    ></vc-picker-view>
  </div>
</template>

<script>
  import { countDays, fixZero } from '../../utils/utils'
  import VcPickerView from '../picker-view'

  const defaultTimeUnits = {
    Y: '年',
    M: '月',
    D: '日',
    h: '时',
    m: '分',
    s: '秒',
    am: '上午',
    pm: '下午'
  }

  export default {
    name: 'vc-picker',

    components: {
      VcPickerView
    },

    props: {
      showItemNum: Number,
      showItemHeight: Number,
      defaultValues: Array,

      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      onConfirm: {
        type: Function,
        default: function () {}
      },
      onCancel: {
        type: Function,
        default: function () {}
      },
      onChange: {
        type: Function,
        default: function () {}
      },

      mode: {
        type: String,
        default: 'datetime'
      },
      minDate: {
        type: Date,
        default () {
          var now = new Date()
          now.setFullYear(now.getFullYear() - 10)
          return now
        }
      },
      maxDate: {
        type: Date,
        default () {
          var now = new Date()
          now.setFullYear(now.getFullYear() + 10)
          return now
        }
      },
      use12Hours: {
        type: Boolean,
        default: true
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      showUnit: {
        type: Boolean,
        default: true
      },
      showDivider: {
        type: Boolean,
        default: false
      },
      customUnits: Object
    },

    data  () {
      return {
        slots: [],
        timeUnits: null,
        slotsMeaning: []
      }
    },

    created () {
      this.timeUnits = Object.assign({}, defaultTimeUnits, this.defaultTimeUnits)

      var i, minYear, maxYear, slots = [], tmp, end, start,
        now = new Date(), unit = this.timeUnits,
        slotsMeaning = this.slotsMeaning

      //这里就是根据mode,生成slots
      if (this.mode.indexOf('date') !== -1) {
        minYear = this.minDate.getFullYear()
        maxYear = this.maxDate.getFullYear()
        //年
        tmp = {
          values: [],
          labelKey: 'text',
          defaultIndex: now.getFullYear() - minYear
        }
        for (i = minYear; i <= maxYear; i++)
          tmp.values.push({
            text: this.showUnit ? i + unit.Y : i,
            value: i
          })
        slots.push(tmp)
        slotsMeaning.push('Y')
        //区分符 -
        if (this.showDivider) {
          tmp = {
            divider: true,
            content: '-'
          }
          slots.push(tmp)
        }
        //月
        tmp = {
          values: [],
          labelKey: 'text',
          defaultIndex: now.getMonth()
        }
        for (i = 1; i <= 12; i++)
          tmp.values.push({
            text: this.showUnit ? fixZero(i) + unit.M : fixZero(i),
            value: i
          })
        slots.push(tmp)
        slotsMeaning.push('M')
        //区分符 -
        if (this.showDivider) {
          tmp = {
            divider: true,
            content: '-'
          }
          slots.push(tmp)
        }
        //日
        tmp = {
          values: [],
          labelKey: 'text',
          defaultIndex: now.getFullYear() - minYear
        }
        tmp.values = this._getMonthDays(now.getFullYear(), now.getMonth() + 1)
        slots.push(tmp)
        slotsMeaning.push('D')
      }

      if (this.mode.indexOf('time') !== -1) {
        //小时
        end = this.use12Hours === true ? 12 : 23
        start = this.use12Hours === true ? 1 : 0
        tmp = {
          values: [],
          labelKey: 'text',
          defaultIndex: 7
        }
        for (i = start; i <= end; i++)
          tmp.values.push({
            text: this.showUnit ? fixZero(i) + unit.h : fixZero(i),
            value: i
          })
        slots.push(tmp)
        slotsMeaning.push('h')

        //区分符 :
        if (this.showDivider) {
          tmp = {
            divider: true,
            content: ':'
          }
          slots.push(tmp)
        }
        //分钟
        tmp = {
          values: [],
          labelKey: 'text',
          defaultIndex: 0
        }
        for (i = 0; i <= 59; i++)
          tmp.values.push({
            text: this.showUnit ? fixZero(i) + unit.m : fixZero(i),
            value: i
          })
        slots.push(tmp)
        slotsMeaning.push('m')

        if (this.use12Hours === true) {
          slots.push({
            values: [
              {
                text: unit.am,
                value: 'am'
              },
              {
                text: unit.pm,
                value: 'pm'
              }
            ],
            defaultIndex: 0,
            labelKey: 'text'
          })
          slotsMeaning.push('apm')
        }
      }

      this.slots = slots
    },

    methods: {
      _cancel (e) {
        this.onCancel instanceof Function && this.onCancel(this.$refs.picker)
        this.$popupCtrl.close()
      },

      _confirm (e) {
        this.onConfirm instanceof Function && this.onConfirm(this.$refs.picker)
        this.$popupCtrl.close()
      },

      _onChange (picker, val) {
        if (this.mode === 'date' || this.mode === 'datetime') {
          picker.setSlotValues(1,
            this._getMonths(val[0].value))

          val[0] && val[1] &&
          picker.setSlotValues(2,
            this._getMonthDays(val[0].value, val[1].value))
        }
        this.onChange(picker, val)
      },

      _parseVal (rawVal) {
        var val = {}, endFunc, tmp

        this.slotsMeaning.forEach((type, i) => {
          if (type === 'apm') {
            tmp = i
            endFunc = () => {
              if (rawVal[tmp].value === 'pm')
                val.h += 12
            }
          } else {
            val[type] = rawVal[i].value
          }
        })
        endFunc && endFunc()
        return val
      },

      _setValue (parsedVal) {
        var rawVal = [],
          unit = this.timeUnits,
          showUnit = this.showUnit

        this.slotsMeaning.forEach((type, i) => {
          if (type === 'apm') {
            rawVal.push({
              text: unit[type],
              value: parsedVal.apm
            })
          } else {
            rawVal.push({
              text: showUnit ? fixZero(parsedVal[type]) + unit[type] : fixZero(parsedVal[type]),
              value: parsedVal[type]
            })
          }
        })

        return rawVal
      },

      _getMonthDays (year, month) {
        year = parseInt(year, 10)
        month = parseInt(month, 10)

        var i = 1, total = countDays(year, month),
          days = [], unit = this.timeUnits.D

        if (this.minDate.getFullYear() === year && this.minDate.getMonth() + 1 === month) {
          i = this.minDate.getDate()
        } else if (this.maxDate.getFullYear() === year && this.maxDate.getMonth() + 1 === month) {
          total = this.maxDate.getDate()
        }

        for (i; i <= total; i++) {
          days.push({
            text: this.showUnit ? fixZero(i) + unit : fixZero(i),
            value: i
          })
        }
        return days
      },

      _getMonths (year) {
        year = parseInt(year, 10)

        var i = 1, total = 12,
          months = [], unit = this.timeUnits.M

        if (this.minDate.getFullYear() === year) {
          i = this.minDate.getMonth() + 1
        } else if (this.maxDate.getFullYear() === year) {
          total = this.maxDate.getMonth() + 1
        }

        for (i; i <= total; i++) {
          months.push({
            text: this.showUnit ? fixZero(i) + unit : fixZero(i),
            value: i
          })
        }
        return months
      },

      _getHours (year, month, day) {
        year = parseInt(year, 10)
        month = parseInt(month, 10)
        day = parseInt(day, 10)

        var i = 1, total = 12,
          months = [], unit = this.timeUnits.M

        if (this.minDate.getFullYear() === year) {
          i = this.minDate.getMonth() + 1
        } else if (this.maxDate.getFullYear() === year) {
          total = this.maxDate.getMonth() + 1
        }

        for (i; i <= total; i++) {
          months.push({
            text: this.showUnit ? fixZero(i) + unit : fixZero(i),
            value: i
          })
        }
        return months
      },

      _getMinutes (year, month, day, hour) {
        year = parseInt(year, 10)
        month = parseInt(month, 10)
        day = parseInt(day, 10)
        hour = parseInt(hour, 10)

        var i = 1, total = 12,
          months = [], unit = this.timeUnits.M

        if (this.minDate.getFullYear() === year) {
          i = this.minDate.getMonth() + 1
        } else if (this.maxDate.getFullYear() === year) {
          total = this.maxDate.getMonth() + 1
        }

        for (i; i <= total; i++) {
          months.push({
            text: this.showUnit ? fixZero(i) + unit : fixZero(i),
            value: i
          })
        }
        return months
      }
    }
  }
</script>

<style lang="scss">
  .vc-picker{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: auto;
    transition: all 250ms ease 0s;
  }

  .vc-picker-head {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 9px 15px;
    background-color: #fff;
    position: relative;
    text-align: center;
    font-size: 17px;

    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }

  .vc-picker-action {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #1aad19;

    &:first-child {
      text-align: left;
      color: #888;
    }

    &.noExpand{
      flex: 0 0 auto;
      padding: 0 5px;
      transition: all 40ms linear 0ms;

      &:active {
        background: #ececec;
      }
    }
  }
</style>
