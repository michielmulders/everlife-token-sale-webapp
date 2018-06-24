import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Dashboard from '@/pages/dashboard'
import Contribute from '@/pages/contribute'
import NotFound from '@/components/NotFound'
import Logout from '@/components/logout'

import store from '../store';
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: Contribute,
      meta: { requiresAuth: true }
    },
    { path: '*', name: 'notfound', component: NotFound }
  ]
})

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = store.getters.isLoggedIn;
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (isLoggedIn) {
//       next()
//     } else {
//       next({ name: 'login', query: { redirect: to.fullPath } })
//     }
//   } else {
//     next()
//   }
// })

export default router
