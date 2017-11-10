import Vue from 'vue'
import Router from 'vue-router'
import Navs from './navs.json'
export const navs = Navs

Vue.use(Router)

function initNavs (navs) {
  var routes = []

  navs.forEach((item) => {
    routes.push({
      path: item.path,
      name: item.name,
      component: resolve => require([`../components${item.path}.vue`], resolve),
      meta: {
        title: item.title || item.name,
        description: item.description
      }
    })
  })

  return routes
}

const routes = initNavs(Navs)

routes.push({
  path: '/',
  component: resolve => require(['../components/index.vue'], resolve),
  name: 'index',
  meta: {
    title: 'vc-popup',
    description: 'popup component for vue'
  }
})

export default new Router({
  routes: routes
})
