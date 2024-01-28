import Vue from 'vue'
import Router from 'vue-router'
import Settings from '../views/Settings'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Settings
    }
  ]
})
