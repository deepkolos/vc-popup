<template>
  <div class="calendar-picker" @click="_click">
    <vc-calendar ref="calendar"></vc-calendar>
  </div>
</template>

<script>
  import VcCalendar from './calendar.vue'
  import { monthsBetween } from '../../mixins/utils'

  export default {
    name: 'vc-calendar-picker',

    components: {
      VcCalendar
    },

    /** {Event}
     * @function{onSelectHasDisableDate}
     * @function{onSelect}
     */

    props: {
      type: {
        type: String,
        default: 'range'
      }
    },

    data () {
      return {
        selectedOne: null,
        selectedTwo: null,
        selectedStart: null,
        selectedEnd: null,
        clickedCount: 0
      }
    },

    methods: {
      //公共方法
      clearSelection (check = true) {
        this.$refs.calendar.clearSelection()

        if (check) {
          this.selectedOne = null
          this.clickedCount = 0
          this._emitDone()
        }
      },

      select (range) {
        var date = new Date(),
          endY = date.getFullYear(),
          endM = date.getMonth(),
          endD = date.getDate(),
          startY, startM, startD

        if (range === 'today') {
          startY = endY
          startM = endM
          startD = endD
        } else if (range === 'yesterday') {
          date.setDate(date.getDate() - 1)
          startY = endY = date.getFullYear()
          startM = endM = date.getMonth()
          startD = endD = date.getDate()
        } else if (range === 'tomorrow') {
          date.setDate(date.getDate() + 1)
          startY = endY = date.getFullYear()
          startM = endM = date.getMonth()
          startD = endD = date.getDate()
        } else if (range === 'lastWeek') {
          date.setDate(date.getDate() - 6)
          startY = date.getFullYear()
          startM = date.getMonth()
          startD = date.getDate()
        } else if (range === 'lastMonth') {
          date.setDate(date.getDate() - 29)
          startY = date.getFullYear()
          startM = date.getMonth()
          startD = date.getDate()
        } else if (range instanceof Object) {
          ({startY, startM, startD, endY, endM, endD} = range)
          // 在这里验证格式, 因为vue出现格式错误还是继续执行代码...
          if (
            // 月
            startM < 1  || endM < 1  ||
            startM > 12 || endM > 12 ||

            // 日
            startD < 1  || startD < 1 ||
            startD > 31 || startD > 31
          ) return console.error('请检查defaultRange的输入, 有效范围分别为, 月: 1~12, 日: 1~31')

          // 格式还是从1还是算
          startM--
          endM--
        }
        this.clearSelection()
        this._select(startY, startM + 1, startD, endY, endM + 1, endD)
      },

      //私有方法
      _click (e) {
        if (e.carrier) {
          if (this.type === 'range') {
            if (this.clickedCount === 0) {
              this.selectedOne = e.carrier
              this.selectedTwo = null
              this._selectedOne()
            }

            if (this.clickedCount === 1)
              this.selectedTwo = e.carrier

            this.clickedCount++
            if (this.clickedCount > 1) {
              this.clickedCount = 0
              this._selectedTwo()
            }
          } else if (this.type === 'point') {
            this.selectedOne = e.carrier
            this._selectedOne()
          }
        }
      },

      _toTime (time) {
        return +new Date(`${time.year}-${time.month}-${time.day}`).getTime()
      },

      _setRange (start, end) {
        //需要算出所涉及的月份
        var monthsInvolved = 0, i,
          getVmMonth = this.$refs.calendar.getMonthByOffset,
          vmMonth0 = getVmMonth(0),
          startOffset, git = [], hashDisableOnSelect, disableDaySelected

        monthsInvolved = monthsBetween(
          end.year, end.month,
          start.year, start.month
        ) + 1

        //转发给对应的vm_month
        startOffset = monthsBetween(
          start.year, start.month,
          vmMonth0.year, vmMonth0.month
        )

        for (i = 0; i < monthsInvolved; i++) {
          git.push(getVmMonth(startOffset++).setRange(start, end))
        }

        //在这里检查是否有disable的情况咯
        hashDisableOnSelect = false
        disableDaySelected = []
        git.forEach(result => {
          if (result.hashDisableDay === true) {
            hashDisableOnSelect = true
            disableDaySelected.push.apply(disableDaySelected, result.disableDaySelected)
          }
        })

        if (hashDisableOnSelect === false) {
          git.forEach(result => {
            result.commit()
          })
          this._emitDone(start, end)
        } else {
          this.clearSelection()
          this.$emit('onSelectHasDisableDate', disableDaySelected)
        }
      },

      _selectedTwo () {
        var
          start = {
            year: this.selectedOne.vm_month.year,
            month: this.selectedOne.vm_month.month,
            day: this.selectedOne.vm_day.day,
            vms: this.selectedOne
          },
          end = {
            year: this.selectedTwo.vm_month.year,
            month: this.selectedTwo.vm_month.month,
            day: this.selectedTwo.vm_day.day,
            vms: this.selectedTwo
          },
          tmp,
          startTime = this._toTime(start),
          endTime = this._toTime(end)

        if (startTime > endTime) {
          tmp = start
          start = end
          end = tmp
          tmp = null
        }

        this._setRange(start, end)
      },

      _selectedOne () {
        var val = this.selectedOne

        this.clearSelection(false)
        if (val) {
          val.vm_month.getDay(val.vm_day.day).status =
             this.type === 'range' ? 'selected-start' : 'selected-left-right'

          this._emitDone()
        }
      },

      _emitDone (start, end) {
        if (this.type === 'point') {
          this.selectedStart = null

          if (this.selectedOne)
            this.selectedStart = {
              year: this.selectedOne.vm_month.year,
              month: this.selectedOne.vm_month.month,
              day: this.selectedOne.vm_day.day
            }
          this.$emit('onSelect', this.selectedStart)
        } else if (this.type === 'range') {
          this.selectedStart = null

          if (this.selectedOne)
            this.selectedStart = {
              year: this.selectedOne.vm_month.year,
              month: this.selectedOne.vm_month.month,
              day: this.selectedOne.vm_day.day
            }

          this.selectedEnd = null
          if (start)
            this.selectedStart = {
              year: start.year,
              month: start.month,
              day: start.day
            }

          if (end)
            this.selectedEnd = {
              year: end.year,
              month: end.month,
              day: end.day
            }
          this.$emit('onSelect', this.selectedStart, this.selectedEnd)
        }
      },

      _select (startY, startM, startD, endY, endM, endD, oldScrollHeight, oldScrollTop) {
        var vmCalendar = this.$refs.calendar,
          $wrapper = vmCalendar.$refs.pullDownRefresh.getScrollContainer()
        //检查月份是否加载
        if (monthsBetween(startY, startM, vmCalendar.currentMinY, vmCalendar.currentMinM) < 0) {
          vmCalendar._loadMorePrev(() => {})
          // 保存滚动状态
          if ($wrapper.scrollTop === 0)
            $wrapper.scrollTop = 1
          this.$nextTick(() => {
            this._select.apply(this, arguments)
          })
          return
        }

        var vmMonthStart = this.$refs.calendar.getMonth(startY, startM),
          vmMonthEnd = this.$refs.calendar.getMonth(endY, endM),
          vmDayStart = vmMonthStart.getVmDay(startD),
          vmDayEnd = vmMonthEnd.getVmDay(endD)

        this.selectedOne = {
          vm_month: vmMonthStart,
          vm_day: vmDayStart
        }

        if (this.type === 'range') {
          this.selectedTwo = {
            vm_month: vmMonthEnd,
            vm_day: vmDayEnd
          }
          this._selectedTwo()
        } else if (this.type === 'point') {
          this._selectedOne()
        }
      }
    }
  }
</script>
