<template>
  <div class="page" ref="page">
    <div class="title">选择器示例</div>
    <div class="cell" @click="ticketPickerClick">
      单列选择<span>{{ticket | pickerValueFilter}}</span></div>
    <div class="cell" @click="dayPickerClick">
      多列选择<span>{{dayAndTime | pickerValueFilter}}</span></div>
    <div class="cell" @click="addressPickerClick">
      联动选择<span>{{address | pickerValueFilter}}</span></div>

    <div class="title">日期选择器示例</div>
    <div class="cell" @click="timePickerClick">
      时间<span>{{time | dateValueFilter}}</span></div>
    <div class="cell" @click="time24PickerClick()">
      时间(24h)<span>{{time24 | dateValueFilter}}</span></div>
    <div class="cell" @click="time24PickerClick(true)">
      时间(24h, 显示区分符)<span>{{time24 | dateValueFilter}}</span></div>
    <div class="cell" @click="datePickerClick">
      日期<span>{{date | dateValueFilter}}</span></div>
    <div class="cell" @click="datetimePickerClick(false, true)">
      日期时间<span>{{datetime | dateValueFilter}}</span></div>
    <div class="cell" @click="datetimePickerClick(true, false)">
      无单位<span>{{datetime | dateValueFilter}}</span></div>
    <div class="cell" @click="datetimePickerLimitClick">
      指定范围<span>{{datetime | dateValueFilter}}</span></div>
  </div>
</template>

<script>
  import { once } from '../../src/utils/dom.js'
  import chinaAreaData from 'china-area-data'

  let provinces = Object.values(chinaAreaData[86])

  // 获取某一省下的市
  function getCities (province) {
    let provinceCode
    for (let i in chinaAreaData[86]) {
      if (province === chinaAreaData[86][i]) {
        provinceCode = i
        break
      }
    }

    return Object.values(chinaAreaData[provinceCode])
  }

  // 获取某一市下的区/县
  function getAreas (province, city) {
    let provinceCode, cityCode
    for (let i in chinaAreaData[86]) {
      if (province === chinaAreaData[86][i]) {
        provinceCode = i
        break
      }
    }

    for (let i in chinaAreaData[provinceCode]) {
      if (city === chinaAreaData[provinceCode][i]) {
        cityCode = i
        break
      }
    }

    if (chinaAreaData[cityCode]) {
      return Object.values(chinaAreaData[cityCode])
    } else {
      // 只有两级的情况
      return []
    }
  }

  export default {

    data () {
      return {
        ticket: null,
        dayAndTime: null,
        address: null,
        time: null,
        time24: null,
        date: null,
        datetime: null,
        ticketSlots: [
          {
            values: [
              '汽车票',
              '飞机票',
              '火车票',
              '轮船票',
              '其它'
            ],
            defaultIndex: 2
          }
        ],
        daySlots: [
          {
            values: [
              '星期一',
              '星期二',
              '星期三',
              '星期四',
              '星期五'
            ],
            defaultIndex: 0
          },
          {
            values: [
              '上午',
              '下午'
            ],
            defaultIndex: 0
          }
        ],
        addressSlots: [
          {
            values: provinces
          },
          {
            values: []
          },
          {
            values: []
          }
        ]
      }
    },

    created () {
      this.ticketPicker = new this.$popup.picker({
        propsData: {
          slots: this.ticketSlots,
          onConfirm: this.confirmTicket
        }
      })

      this.dayPicker = new this.$popup.picker({
        propsData: {
          slots: this.daySlots,
          onConfirm: this.confirmDayTime
        }
      })

      this.addressPicker = new this.$popup.picker({
        propsData: {
          slots: this.addressSlots,
          onConfirm: this.confirmAddress,
          onChange: this.onAddressChange
        }
      })

      this.timePicker = new this.$popup.datetimePicker({
        propsData: {
          mode: 'time',
          use12Hours: true,
          onConfirm: this.confirmTimePicker,
          onChange: this.onTimePickerChange
        }
      })

      this.datePicker = new this.$popup.datetimePicker({
        propsData: {
          mode: 'date',
          onConfirm: this.confirmDatePicker,
          onChange: this.onDatePickerChange
        }
      })

      this.datetimePicker = new this.$popup.datetimePicker({
        propsData: {
          mode: 'datetime',
          onConfirm: this.confirmDatetimePicker,
          onChange: this.onDatetimePickerChange
        }
      })
    },

    methods: {
      ticketPickerClick (e) {
        this.ticketPicker.open(e, {
          propsData: {
            defaultValues: this.ticket
          }
        })
      },
      dayPickerClick (e) {
        this.dayPicker.open(e, {
          propsData: {
            defaultValues: this.dayAndTime
          }
        })
      },
      addressPickerClick (e) {
        this.addressPicker.open(e, {
          propsData: {
            defaultValues: this.address
          }
        })
      },
      timePickerClick(e){
        this.timePicker.open(e, {
          propsData: {
            defaultValues: this.time
          }
        })
      },
      datePickerClick (e){
        this.datePicker.open(e, {
          propsData: {
            defaultValues: this.date
          }
        })
      },
      datetimePickerClick (showDivider, showUnit){
        this.datetimePicker.open(null, {
          propsData: {
            use12Hours: false,
            showDivider: showDivider,
            showUnit: showUnit
          }
        })
      },
      time24PickerClick(showDivider){
        this.timePicker.open(null, {
          propsData: {
            use12Hours: false,
            onConfirm: this.confirmTime24Picker,
            showDivider: showDivider
          }
        })
      },
      datetimePickerLimitClick(){
        this.datetimePicker.open(null, {
          propsData: {
            use12Hours: false,
            minDate: new Date(2015,10,7,5,20),
            maxDate: new Date(2018,10,7,5,20),
          }
        })
      },

      onChange (picker, value) {
        console.log(value)
      },

      confirmTicket (picker) {
        this.ticket = picker.getValues()
      },

      confirmDayTime (picker) {
        this.dayAndTime = picker.getValues()
      },

      confirmAddress (picker) {
        this.address = picker.getValues()
      },

      onAddressChange (picker, value) {
        picker.setSlotValues(1, getCities(value[0]))
        picker.setSlotValues(2, getAreas(value[0], value[1]))
      },

      confirmTimePicker (picker){
        this.time = picker.getValues()
      },
      confirmTime24Picker (picker){
        this.time24 = picker.getValues()
      },

      onTimePickerChange (picker, value){
        console.log(value)
      },

      confirmDatePicker (picker){
        this.date = picker.getValues()
      },

      onDatePickerChange (picker, val){
        console.log(val)
      },

      confirmDatetimePicker (picker){
        this.datetime = picker.getValues()
      },

      onDatetimePickerChange (picker, val){
        console.log(val)
      },
    },

    filters: {
      pickerValueFilter (val) {
        if (Array.isArray(val)) {
          return val.toString()
        } else {
          return '请选择'
        }
      },

      dateValueFilter (val){
        var values = []
        if (Array.isArray(val)) {
          val.forEach((obj)=>{
            if(obj.text)
              values.push(obj.text)
            else
              values.push(obj)
          })
          return values.toString()
        } else {
          return '请选择'
        }
      }
    }
  }
</script>

<style scoped>
  img {
    position: fixed;
    z-index: 1000000000000000000000000000;
  }
</style>

