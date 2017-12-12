// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import PopUp from '../src'
// import PopUp from '../lib/vc-popup'
import router from './router'
import './assets/animate.min.css'
import './assets/animated-preset.css'
import './assets/demo.css'
import test from '../packages/popup-bottom-menu'
import test1 from '../packages/popup-by-animation'
import test2 from '../packages/popup-calendar'
import test3 from '../packages/popup-center-menu'
import test4 from '../packages/popup-datetime-picker'
import test5 from '../packages/popup-dialog'
import test6 from '../packages/popup-dom-relative'
import test7 from '../packages/popup-img-viewer'
import test8 from '../packages/popup-over'
import test9 from '../packages/popup-picker'
import test10 from '../packages/popup-press-menu'

Vue.config.productionTip = false

// Vue.use(PopUp)
Vue.use(test)
Vue.use(test1)
Vue.use(test2)
Vue.use(test3)
Vue.use(test4)
Vue.use(test5)
Vue.use(test6)
Vue.use(test7)
Vue.use(test8)
Vue.use(test9)
Vue.use(test10)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
