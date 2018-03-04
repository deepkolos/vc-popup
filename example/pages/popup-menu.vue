<template>
  <div class="page" ref="page">
    <div class="cell" @click="click1">仿微信底部弹出菜单</div>
    <div class="cell" @click="click2">仿微信居中菜单</div>
    <div class="cell" @click="click3">仿微信长按菜单(click触发)</div>

    <div class="btn" ref="btn16" @click="click4">popover(仿antd)</div>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.bottomMenu = new this.$popup.BottomMenu({
        beforeEnter: function () {
          this.$refs.page.style.filter = 'blur(1.5px)'
        }.bind(this),

        beforeLeave: function () {
          this.$refs.page.style.filter = null
        }.bind(this),

        propsData: {
          items: [
            {
              name: '条目0',
              click: () => { this.bottomMenu.close() }
            }, {
              name: '条目1',
              click: (e) => { this.bottomMenu.close() }
            }, {
              name: '条目2',
              click: () => { this.bottomMenu.close() }
            }, {
              name: '条目3-x',
              click: (e) => { this.bottomMenu2.open(e) }
            }
          ]
        }
      })

      this.bottomMenu2 = new this.$popup.BottomMenu({
        propsData: {
          items: [
            {
              name: '条目3-0',
              click: () => {
                this.bottomMenu2.close()
              }
            }, {
              name: '条目3-1',
              click: () => {
                this.bottomMenu2.close()
              }
            }
          ]
        }
      })

      this.centerMenu = new this.$popup.CenterMenu({
        propsData: {
          items: [
            {
              name: '条目0',
              click: () => { this.centerMenu.close() }
            }, {
              name: '条目1',
              click: (e) => { this.centerMenu.close() }
            }, {
              name: '条目2',
              click: () => { this.centerMenu.close() }
            }, {
              name: '条目3-x',
              click: (e) => { this.centerMenu2.open(e) }
            }
          ]
        }
      })

      this.centerMenu2 = new this.$popup.CenterMenu({
        propsData: {
          items: [
            {
              name: '条目3-0',
              click: () => {
                this.centerMenu2.close()
              }
            }, {
              name: '条目3-1',
              click: () => {
                this.centerMenu2.close()
              }
            }
          ]
        }
      })

      this.pressMenu = new this.$popup.PressMenu({
        propsData: {
          items: [
            {
              name: '条目0',
              click: () => { this.pressMenu.close() }
            }, {
              name: '条目1',
              click: (e) => { this.pressMenu.close() }
            }, {
              name: '条目2',
              click: () => { this.pressMenu.close() }
            }, {
              name: '条目3-x',
              click: (e) => { this.pressMenu2.open(e) }
            }
          ]
        }
      })

      this.pressMenu2 = new this.$popup.PressMenu({
        propsData: {
          items: [
            {
              name: '条目3-0',
              click: () => {
                this.pressMenu2.close()
              }
            }, {
              name: '条目3-1',
              click: () => {
                this.pressMenu2.close()
              }
            }
          ]
        }
      })

      this.Popover = new this.$popup.Popover({
        refDom: this.$refs.btn16,
        refCorner: 'bottom right',
        relativeToCorner: 'below before',
        propsData: {
          items: [
            {
              name: '扫描',
              click: e => console.log('btn0 clicked'),
              src: 'https://gw.alipayobjects.com/zos/rmsportal/tOtXhkIWzwotgGSeptou.svg'
            }, {
              name: '二维码',
              click: e => this.Popover.close(e),
              src: 'https://gw.alipayobjects.com/zos/rmsportal/PKAgAqZWJVNwKsAJSmXd.svg'
            }, {
              name: '帮助',
              click: e => this.Popover.close(e),
              src: 'https://gw.alipayobjects.com/zos/rmsportal/uQIYTFeRrjPELImDRrPt.svg'
            }
          ]
        }
      })
    },

    methods: {
      click1 (e) {
        this.bottomMenu.open(e)
      },

      click2 (e) {
        this.centerMenu.open(e)
      },

      click3 (e) {
        this.pressMenu.open(e)
      },

      click4 (e) {
        this.Popover.open(e)
      }
    }
  }
</script>

<style scoped>
  .btn {
    width: 150px;
    height: 38px;
    background: #009688;
    color: #fff;
    border-radius: 3px;
    font-size: 17px;
    margin: 20px auto 0 auto;
    text-align: center;
    line-height: 38px;
  }
  .btn:last-child {
    margin-bottom: 20px;
  }
</style>
