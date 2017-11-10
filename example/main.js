// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PopUp from '../src'
import router from './router'
import 'weui/dist/style/weui.min.css'
import Button from './components/button/index'
import Group from './components/group/index'
import Cell from './components/cell/index'
import './assets/animate.min.css'
import './assets/animated-preset.css'

Vue.config.productionTip = false

Vue.use(PopUp)
Vue.component(Button.name, Button)
Vue.component(Group.name, Group)
Vue.component(Cell.name, Cell)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
