<template>
  <div class="page" ref="page">
    <div class="cell" @click="click0">选择日期</div>
    <div class="cell" @click="click2">选择日期(快捷)</div>
    <div class="cell" @click="click1">选择日期区间</div>
    <div class="cell" @click="click3">选择日期区间(快捷)</div>
    <div class="cell" @click="click4">选择日期时间</div>
    <div class="cell" @click="click5">选择日期时间(快捷)</div>
    <div class="cell" @click="click6">选择日期时间区间</div>
    <div class="cell" @click="click7">选择日期时间区间(快捷)</div>
    <div class="cell" @click="click8">默认选择范围</div>
    <div class="cell" @click="click9">大行距</div>
    <div class="cell" @click="click10">水平进入</div>
    <div class="cell" @click="click11">bounceIn</div>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.calendar = new this.$popup.Calendar({})
    },

    methods: {
      click0 (e) {
        this.calendar.open(e, {
          propsData: {
            type: 'point',
            onConfirm: (result) => {
              console.log(result)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click1 (e) {
        this.calendar.open(e, {
          propsData: {
            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click2 (e) {
        this.calendar.open(e, {
          propsData: {
            type: 'point',
            enableShortcut: true,
            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click3 (e) {
        this.calendar.open(e, {
          animation: {
            in: {
              effect: 'zoomFromDom'
            },
            out: {
              effect: 'zoomFromDom'
            }
          },

          propsData: {
            enableShortcut: true,
            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click4 (e) {
        this.calendar.open(e, {
          propsData: {
            type: 'point',
            enableTimeSelect: true,
            onConfirm: (result) => {
              console.log(result)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click5 (e) {
        this.calendar.open(e, {
          propsData: {
            type: 'point',
            enableTimeSelect: true,
            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click6 (e) {
        this.calendar.open(e, {
          propsData: {
            enableTimeSelect: true,
            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click7 (e) {
        this.calendar.open(e, {
          animation: {
            in: {
              effect: 'zoomFromDom'
            },
            out: {
              effect: 'zoomFromDom'
            }
          },

          propsData: {
            enableTimeSelect: true,
            enableShortcut: true,
            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click8 (e) {
        var date = new Date()
        var getRandDay = function () {
          return Math.ceil(Math.random() * 30)
        }

        this.calendar.open(e, {
          propsData: {
            defaultRange: {
              startY: date.getFullYear(),
              startM: date.getMonth() + 1,
              startD: getRandDay(),
              endY: date.getFullYear(),
              endM: date.getMonth() + 2,
              endD: getRandDay()
            },

            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click9 (e) {
        this.calendar.open(e, {
          propsData: {
            isLargeRowledge: true,

            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click10 (e) {
        this.calendar.open(e, {
          animation: {
            in: ['vc-duration-500', 'slideInRight'],
            out: ['vc-duration-350', 'slideOutRight']
          },

          propsData: {
            isLargeRowledge: true,

            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      },

      click11 (e) {
        this.calendar.open(e, {
          animation: {
            in: ['animated', 'bounceIn'],
            out: ['animated', 'bounceOut']
          },

          propsData: {
            isLargeRowledge: true,

            onConfirm: (start, end) => {
              console.log(start, end)
            },

            onDisableDaySelected: (days) => {
              console.log(days)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  
</style>

