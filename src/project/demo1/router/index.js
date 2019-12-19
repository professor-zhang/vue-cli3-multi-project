import Vue from 'vue'
import Router from 'vue-router'
import home from '@/project/demo1/pages/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/demo1/home',
      name: 'home',
      component: home
    }
  ]
})
