<template>
  <div class="page" ref="page">
    <br>
    <div class="title">animation设置示例</div>

    <div class="cell" @click="click1">in/out(animation实现)</div>
    <div class="cell" @click="click2">init/in/out(transition实现)</div>

    <div class="title">一些过度动画示例</div>
    <div class="cell" @click="click3">背景模糊(设置#app的blur)</div>
    <div class="cell" @click="click4">磁贴按压效果</div>
    <div class="cell" @click="click5">不会锁定滚动</div>

    <div class="title">位置定位示意图(25种)(小圆可点击)</div>

    <div class="refDom" ref="demoRefDom">
      <div class="corner top_left">
        <div class="above_before" @click="clickDomRefDemo('top','left','above','before')"></div>
        <div class="above_after" @click="clickDomRefDemo('top','left','above','after')"></div>
        <div class="below_after" @click="clickDomRefDemo('top','left','below','after')"></div>
        <div class="below_before" @click="clickDomRefDemo('top','left','below','before')"></div>
      </div>
      <div class="corner top_right">
        <div class="above_before" @click="clickDomRefDemo('top','right','above','before')"></div>
        <div class="above_after" @click="clickDomRefDemo('top','right','above','after')"></div>
        <div class="below_after" @click="clickDomRefDemo('top','right','below','after')"></div>
        <div class="below_before" @click="clickDomRefDemo('top','right','below','before')"></div>
      </div>
      <div class="corner bottom_right">
        <div class="above_before" @click="clickDomRefDemo('bottom','right','above','before')"></div>
        <div class="above_after" @click="clickDomRefDemo('bottom','right','above','after')"></div>
        <div class="below_after" @click="clickDomRefDemo('bottom','right','below','after')"></div>
        <div class="below_before" @click="clickDomRefDemo('bottom','right','below','before')"></div>
      </div>
      <div class="corner bottom_left">
        <div class="above_before" @click="clickDomRefDemo('bottom','left','above','before')"></div>
        <div class="above_after" @click="clickDomRefDemo('bottom','left','above','after')"></div>
        <div class="below_after" @click="clickDomRefDemo('bottom','left','below','after')"></div>
        <div class="below_before" @click="clickDomRefDemo('bottom','left','below','before')"></div>
      </div>

      <div class="edge bottom_center">
        <div class="above" @click="clickDomRefDemo('bottom','center','above','before')"></div>
        <div class="below" @click="clickDomRefDemo('bottom','center','below','before')"></div>
      </div>
      <div class="edge top_center">
        <div class="above" @click="clickDomRefDemo('top','center','above','before')"></div>
        <div class="below" @click="clickDomRefDemo('top','center','below','before')"></div>
      </div>
      <div class="edge center_left">
        <div class="before" @click="clickDomRefDemo('center','left','above','before')"></div>
        <div class="after" @click="clickDomRefDemo('center','left','below','after')"></div>
      </div>
      <div class="edge center_right">
        <div class="before" @click="clickDomRefDemo('center','right','above','before')"></div>
        <div class="after" @click="clickDomRefDemo('center','right','below','after')"></div>
      </div>

      <div class="corner center_center" @click="clickDomRefDemo('center','center','above','before')"></div>
    </div>

    <div class="cell">定位说明:</div>
    <div class="cell">top bottom left right center 设置定位点</div>
    <div class="cell">above below before after 相对定位点偏移</div>
    <div class="cell">红色 -> above after</div>
    <div class="cell">绿色 -> above before</div>
    <div class="cell">黄色 -> below after</div>
    <div class="cell">蓝色 -> below before</div>
    <div class="cell">边缘居中的时候, 所居中的轴的对应的偏移设置将会失效</div>
    <div class="cell">比如做边缘的垂直居中, 垂直方向的above,below偏移设置将会无效</div>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.bottomMenu = new this.$popup.BottomMenu({
        propsData: {
          items: [
            {
              name: '条目0',
              click: () => { this.bottomMenu.close() }
            }, {
              name: '条目1',
              click: () => { this.bottomMenu.close() }
            }, {
              name: '条目2',
              click: () => { this.bottomMenu.close() }
            }, {
              name: '条目3',
              click: () => { this.bottomMenu.close() }
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
              click: () => { this.centerMenu.close() }
            }, {
              name: '条目2',
              click: () => { this.centerMenu.close() }
            }, {
              name: '条目3',
              click: () => { this.centerMenu.close() }
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
              click: () => { this.pressMenu.close() }
            }, {
              name: '条目2',
              click: () => { this.pressMenu.close() }
            }, {
              name: '条目3',
              click: () => { this.pressMenu.close() }
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
        this.bottomMenu.open(e, {
          animation: {
            in: 'animation-in',
            out: 'animation-out'
          }
        })
      },

      click2 (e) {
        this.bottomMenu.open(e, {
          animation: {
            init: 'transition-init',
            in: 'transition-in',
            out: 'transition-out'
          }
        })
      },

      click3 (e) {
        this.bottomMenu.open(e, {
          propsData: {
            items: [
              {
                name: '条目0',
                click: () => { this.bottomMenu.close() }
              }, {
                name: '条目1',
                click: () => { this.bottomMenu.close() }
              }, {
                name: '条目2',
                click: () => { this.bottomMenu.close() }
              }, {
                name: '条目3',
                click: () => { this.bottomMenu.close() }
              }
            ],

            onOpen: function () {
              this.$refs.page.style.filter = 'blur(1.5px)'
            }.bind(this),

            onClose: function () {
              this.$refs.page.style.filter = null
            }.bind(this)
          }
        })
      },

      click4 (e) {
        this.centerMenu.open(e)
      },

      click5 (e) {
        this.centerMenu.open(e, {
          positionType: 'absolute',
          lockScroll: false
        })
      },

      clickDomRefDemo (top, left, above, after) {
        this.pressMenu.open(null, {
          autoSetOrthocenter: true,
          position: 'domRelative',
          refDom: this.$refs.demoRefDom,
          refCorner: `${top} ${left}`,
          relativeToCorner: `${above} ${after}`,
          propsData: {
            items: [
              {
                name: '',
                click: () => {
                  this.pressMenu2.close()
                }
              }
            ]
          }
        })
      }
    }
  }
</script>

<style>
  /* 自定义的动画class不可以使用scoped, 需要注意class命名问题 */

  /* 使用transition的动画的时候则需要这样设置init来提高权重 */
  .transition-in.transition-init {
    opacity: 0;
    transform: translateX(20%);
  }

  .transition-in {
    opacity: 1;
    transform: translateX(0%);
  }

  .transition-out {
    opacity: 0;
    transform: translateX(-20%);
  }

  /* animation例子 */
  .animation-in {
    animation: animation 280ms ease forwards;
  }

  .animation-out {
    animation: animation 280ms ease reverse;
  }

  @keyframes animation {
    0%{
      opacity: 0;
      transform: scale(.7)
    }
    70%{
      transform: scale(1.05)
    }
    100%{
      opacity: 1;
      transform: scale(1)
    }
  }
</style>

<style scoped>
  .btn {
    width: 120px;
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

  .refDom{
    width: 70vw;
    height: 60vw;
    background-color: rgba(0, 150, 136, 0.2);
    margin: 30px auto;
    position: relative;
  }

  .corner{
    position: absolute;
    height: 50px;
    width: 50px;
    /* border: 1px solid black; */
  }
  .top_left{
    top: 0px;
    left: 0px;
    transform: translate(-50%, -50%);
  }
  .top_right{
    top: 0px;
    right: 0px;
    transform: translate(50%, -50%);
  }
  .bottom_left{
    bottom: 0px;
    left: 0px;
    transform: translate(-50%, 50%);
  }
  .bottom_right{
    bottom: 0px;
    right: 0px;
    transform: translate(50%, 50%);
  }
  .center_center{
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    height: 25px;
    width: 25px;
    background-color: #607d8b;
    border-radius: 100%;
  }

  .edge{
    position: absolute;
    /* border: 1px solid black; */
  }
  .top_center{
    height: 50px;
    width: 25px;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .bottom_center{
    height: 50px;
    width: 25px;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 50%);
  }
  .center_left{
    height: 25px;
    width: 50px;
    left: 0px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .center_right{
    height: 25px;
    width: 50px;
    right: 0px;
    top: 50%;
    transform: translate(50%, -50%);
  }

  .corner > div{
    position: absolute;
    border-radius: 100%;
    height: 50%;
    width: 50%;
  }
  .above_before{
    top: 0;
    left: 0;
    background: #009688;
  }
  .above_after{
    top: 0;
    right: 0;
    background: #f44336;
  }
  .below_before{
    bottom: 0;
    left: 0;
    background: #2196f3;
  }
  .below_after{
    bottom: 0;
    right: 0;
    background: #ffeb3b;
  }

  .edge > div{
    position: absolute;
    border-radius: 100%;
    height: 25px;
    width: 25px;
  }
  .after{
    top: 0;
    right: 0;
    background: #ffeb3b;
  }
  .before{
    top: 0;
    left: 0;
    background: #2196f3;
  }
  .below{
    bottom: 0;
    left: 0;
    background: #ffeb3b;
  }
  .above{
    top: 0;
    left: 0;
    background: #009688;
  }
</style>

