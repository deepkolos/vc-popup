<template>
  <div class="hello" @click="click">
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
      ]
    }
  },

  mounted () {
    this.centerMenu = new this.$centerMenu({
      items: [
        {
          name: '分享二维码',
          click: () => {
            console.log('btn0 clicked')
            this.centerMenu.close()
          }
        },
        {
          name: '换个样式',
          click: () => { this.centerMenu.close() }
        },
        {
          name: '保存到手机',
          click: () => { this.centerMenu.close() }
        },
        {
          name: '扫描二维码',
          click: () => { this.centerMenu.close() }
        }
      ]
    })
  },

  methods: {
    click (e) {
      this.centerMenu.open(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello{
  width: 50px;
  height: 50px;
  background: #42b983;
}
</style>
