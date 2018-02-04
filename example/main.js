// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PopUp from '../src'
import router from './router'
import './assets/animate.min.css'
import './assets/animated-preset.css'
import './assets/demo.css'
// import PopUp from '../lib/vc-popup'
// import '../lib/style.css'

Vue.config.productionTip = false

Vue.use(PopUp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
