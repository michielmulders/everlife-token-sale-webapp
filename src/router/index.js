import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Signup from '@/pages/signup'
import Dashboard from '@/pages/dashboard'
import Kyc from '@/pages/kyc'
import Contribute from '@/pages/contribute'
import Payment from '@/pages/payment'
import NotFound from '@/components/NotFound'
import Logout from '@/components/Logout'
import ReviewKyc from '@/pages/reviewkyc'

import store from '../store';
Vue.use(Router)

/*      outcome/
 *  Contains /login, /signup, /dashboard and /contribute routes,
 *  /dashboard and /contribute is required authentication.
 *  / route redirect to /login route
 */

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { title: "Signup" }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: "Login" }
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
      meta: { title: "Dashboard" }
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: Contribute,
      meta: { title: "Contribute" }
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta: { title: "Payment" }
    },
    {
      path: '/kyc',
      name: 'kyc',
      component: Kyc
      // meta: { requiresAuth: true }
    },
    {
      path: '/reviewkyc',
      name: 'reviewkyc',
      component: ReviewKyc
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

router.beforeEach((to, from, next) => {
  document.title = "Everlife.AI Token Sale - " + to.meta.title
  next()
})

export default router
