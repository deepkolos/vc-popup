<template>
  <div class="page" ref="page">
    <br>
    <div class="title">底部弹出菜单示例</div>

    <div class="cell" @click="click">背景模糊</div>
    <div class="cell" @click="click2">支持animation.css动画库</div>
    <div class="cell" @click="click3">bounceInUp, bounceOutDown</div>
    <div class="cell" @click="click4">flipInX, flipOutX</div>
    <div class="cell" @click="click12">jackInTheBox hinge</div>

    <div class="title">通过自定义animation实现过度示例</div>
    <div class="cell" @click="click6">根据点击的位置定位</div>
    <div class="cell" @click="click7">支持通过animation实现更多小细节</div>

    <div class="title">上下居中的菜单示例</div>
    <div class="cell" @click="click5">磁贴按压效果</div>

    <div class="title">absolute的定位模式</div>
    <div class="cell" @click="click15">不会锁定滚动</div>

    <div class="btn" ref="btn16" @click="click16">popover</div>
    <div style="height: 20px;"></div>

    <div class="title">位置定位示意图(25种)</div>

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

    <div class="cell">#定位说明</div>
    <div class="cell">top,bottom,left,right,center 设置定位点</div>
    <div class="cell">above,below,before,after 相对定位点偏移</div>
    <div class="cell">红色-> above after</div>
    <div class="cell">绿色-> above before</div>
    <div class="cell">黄色-> below after</div>
    <div class="cell">蓝色-> below before</div>
    <div class="cell">边缘居中的时候,所居中的轴的对应的偏移设置将会失效</div>
    <div class="cell">比如做边缘的垂直居中,垂直方向的above,below偏移设置将会无效</div>
  </div>
</template>

<script>
  import { once } from '../../src/utils/dom.js'
  import ByAnimation from '../../src/components/popup-by-animation'
  import DomRelative from '../../src/components/popup-dom-relative'

  export default {

    mounted () {
      
      this.bottomMenu = new this.$popup.BottomMenu({
        propsData: {
          items: [
            {
              name: '这里的popUp系列支持返回键',
              click: () => {console.log('btn0 clicked');}
            },{
              name: '分享二维码',
              click: () => {console.log('btn1 clicked');}
            },
            {
              name: '换个样式',
              click: () => {alert('老了~')}
            },
            {
              name: '保存到手机',
              click: () => {this.bottomMenu2.open()}
            },
            {
              name: '扫描二维码',
              click: () => {this.bottomMenu2.open()}
            }
          ],

          onOpen: function(){
            this.$refs.page.style.filter = 'blur(5px)';
          }.bind(this),

          onClose: function(){
            this.$refs.page.style.filter = null;
            once(this.$refs.page, 'transitionend', function(){
            }.bind(this))
          }.bind(this)
        }
      })

      this.bottomMenu2 = new this.$popup.BottomMenu({
        propsData: {
          items: [
            {
              name: '样式一',
              click: () => {
                console.log('btn2 clicked');
                this.bottomMenu2.close();
              }
            },
            {
              name: '样式二',
              click: () => {
                console.log('btn3 clicked');
                this.bottomMenu2.close();
              }
            }
          ]
        }
      })

      this.centerMenu = new this.$popup.CenterMenu({
        propsData: {
          items: [
            {
              name: '分享二维码',
              click: () => {
                console.log('btn0 clicked');
                this.centerMenu.close()
              }
            },
            {
              name: '换个样式',
              click: () => {this.centerMenu2.open()}
            },
            {
              name: '保存到手机',
              click: () => {this.centerMenu2.open()}
            },
            {
              name: '扫描二维码',
              click: () => {this.centerMenu2.open()}
            }
          ]
        }
      })

      this.centerMenu2 = new this.$popup.CenterMenu({
        propsData: {
          items: [
            {
              name: '样式一',
              click: () => {
                console.log('btn2 clicked');
                this.centerMenu2.close();
              }
            },
            {
              name: '样式二',
              click: () => {
                console.log('btn3 clicked');
                this.centerMenu2.close();
              }
            }
          ]
        }
      })

      this.pressMenu = new this.$popup.PressMenu({
        propsData: {
          items: [
            {
              name: '分享二维码',
              click: () => {console.log('btn0 clicked');}
            },
            {
              name: '换个样式',
              click: (e) => {this.pressMenu2.open(e)}
            },
            {
              name: '保存到手机',
              click: (e) => {this.pressMenu2.open(e)}
            },
            {
              name: '扫描二维码',
              click: (e) => {this.pressMenu2.open(e)}
            }
          ]
        }
      })

      this.pressMenu2 = new this.$popup.PressMenu({
        propsData: {
          items: [
            {
              name: '样式一',
              click: () => {
                console.log('btn2 clicked');
                this.pressMenu2.close();
              }
            },
            {
              name: '样式二',
              click: () => {
                console.log('btn3 clicked');
                this.pressMenu2.close();
              }
            }
          ]
        }
      })

      this.byAnimation = new ByAnimation({
        propsData: {
          items: [
            {
              name: '分享二维码',
              click: () => {console.log('btn0 clicked');}
            },
            {
              name: '换个样式',
              click: (e) => {this.byAnimation2.open(e)}
            },
            {
              name: '保存到手机',
              click: (e) => {this.byAnimation2.open(e)}
            },
            {
              name: '扫描二维码',
              click: (e) => {this.byAnimation2.open(e)}
            }
          ]
        }
      })

      this.byAnimation2 = new ByAnimation({
        propsData: {
          items: [
            {
              name: '样式一',
              click: () => {
                console.log('btn2 clicked');
                this.byAnimation2.close();
              }
            },
            {
              name: '样式二',
              click: () => {
                console.log('btn3 clicked');
                this.byAnimation2.close();
              }
            }
          ]
        }
      })

      this.pressMenu_topLeft_belowAfter = new DomRelative({
        refDom: this.$refs.btn8,
        refCorner: 'top left',
        relativeToCorner: 'below after',
        propsData: {
          items: [
            {
              name: '分享二维码',
              click: () => {console.log('btn0 clicked');}
            },
            {
              name: '换个样式',
              click: (e) => {this.pressMenu.open(e)}
            }
          ]
        }
      })

      this.pressMenu_topRight_belowAfter = new DomRelative({
        refDom: this.$refs.btn9,
        refCorner: 'top right',
        relativeToCorner: 'below after',
        propsData: {
          items: [
            {
              name: '分享二维码',
              click: () => {console.log('btn0 clicked');}
            },
            {
              name: '换个样式',
              click: (e) => {this.pressMenu.open(e)}
            }
          ]
        }
      })

      this.pressMenu_bottomRight_aboveAfter = new DomRelative({
        refDom: this.$refs.btn10,
        refCorner: 'bottom right',
        relativeToCorner: 'above after',
        propsData: {
          items: [
            {
              name: '分享二维码',
              click: () => {console.log('btn0 clicked');}
            },
            {
              name: '换个样式',
              click: (e) => {this.pressMenu.open(e)}
            }
          ]
        }
      })

      this.pressMenu_centerRight_aboveAfter = new DomRelative({
        refDom: this.$refs.btn11,
        refCorner: 'bottom center',
        relativeToCorner: 'below before',
        propsData: {
          items: [
            {
              name: '分享二维码',
              click: () => {console.log('btn0 clicked');}
            },
            {
              name: '换个样式',
              click: (e) => {this.pressMenu.open(e)}
            }
          ]
        }
      })

      this.popupOver = new this.$popup.PopupOver({
        refDom: this.$refs.btn16,
        refCorner: 'bottom right',
        relativeToCorner: 'below before',
        propsData: {
          items: [
            {
              name: '扫描',
              click: e => {console.log('btn0 clicked');},
              src: 'https://gw.alipayobjects.com/zos/rmsportal/tOtXhkIWzwotgGSeptou.svg'
            },{
              name: '二维码',
              click: e => {this.popupOver.close(e)},
              src: 'https://gw.alipayobjects.com/zos/rmsportal/PKAgAqZWJVNwKsAJSmXd.svg'
            },{
              name: '帮助',
              click: e => {this.popupOver.close(e)},
              src: 'https://gw.alipayobjects.com/zos/rmsportal/uQIYTFeRrjPELImDRrPt.svg'
            }
          ]
        }
      })
    },

    methods: {
      click (e) {
        this.bottomMenu.open(e)
      },

      click2 (e) {
        this.bottomMenu.open(e, {
          animation: {
            in: ['animated', 'bounceIn'],
            out: ['animated', 'bounceOut']
          }
        })
      },

      click3 (e) {
        this.bottomMenu.open(e, {
          animation: {
            in: ['animated', 'bounceInUp'],
            out: ['animated', 'bounceOutDown']
          }
        })
      },

      click4 (e) {
        this.bottomMenu.open(e, {
          animation: {
            in: ['animated', 'flipInX'],
            out: ['animated', 'flipOutX']
          }
        })
      },

      click5 (e) {
        this.centerMenu.open(e)
      },

      click15 (e) {
        this.centerMenu.open(e,{
          positionType: 'absolute',
          position: 'center'
        })
      },

      click6 (e) {
        this.pressMenu.open(e)
      },

      click7 (e) {
        this.byAnimation.open(e)
      },

      click8 (e) {
        this.pressMenu_topLeft_belowAfter.open(e)
      },
      click9 (e) {
        this.pressMenu_topRight_belowAfter.open(e)
      },
      click10 (e) {
        this.pressMenu_bottomRight_aboveAfter.open(e)
      },
      click11 (e) {
        this.pressMenu_centerRight_aboveAfter.open(e)
      },
      click12 (e) {
        this.bottomMenu.open(e, {
          animation: {
            in: ['animated', 'jackInTheBox'],
            out: ['animated', 'hinge']
          }
        })
      },
      click13 (e) {
        this.pressMenu_centerRight_aboveAfter.open(e, {
          positionType: 'absolute',
          refDom: this.$refs.btn13
        })
      },

      click16 (e){
        this.popupOver.open(e, {

        })
      },

      click17 (e){
        this.popupOver.open(e, {
          refDom: this.$refs.btn17,
          positionType: 'absolute'
        })
      },

      clickDomRefDemo (top, left, above, after){
        this.pressMenu2.open(null, {
          autoSetOrthocenter: true,
          position: 'domRelative',
          refDom: this.$refs.demoRefDom,
          refCorner: `${top} ${left}`,
          relativeToCorner: `${above} ${after}`,
          propsData: {
            items:[
              {
                name: '',
                click: () => {
                  this.pressMenu2.close();
                }
              }
            ]
          }
        })
      }
    }
  }
</script>

<style scoped>
  img {
    position: fixed;
    z-index: 1000000000000000000000000000;
    top: 50%;
    left: 50%;
    width: 100px;
    margin: -50px 0 0 -50px;
    /* 用于测试z-index的绝对覆盖 */
  }

  span{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

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

