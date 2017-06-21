import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      component: (resolve) => {require(['@/views/Login'], resolve)},
      name: 'login'
    },
    {
      path: '/',
      component: (resolve) => { require(['@/views/Main'], resolve) }, 
      meta: { requireAuth: true },
      redirect: { path: '/home' },
      children: [
        {
          path: '/404',
          component: (resolve) => {require(['@/views/pages/404'], resolve)},
          name: '404'
        },
        {
          path: '/home',
          component: (resolve) => {require(['@/views/pages/Home'], resolve)},
          name: '主页'
        },
        // {
        //   path: '/table',
        //   name: '表格',
        //   component: (resolve) => { require(['@/views/pages/01/table'], resolve) }
        // },
        {
          path: '/form',
          name: '表单',
          component: (resolve) => { require(['@/views/pages/02/form'], resolve) }
        },
        {
          path: '/chart',
          name: '图表',
          component: (resolve) => { require(['@/views/pages/03/chart'], resolve) }
        }
      ]
    },
    {
      path: '*',
      redirect: { path: '/404' }
    }
  ]
})