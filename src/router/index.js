import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'

const isAuthenticated = (to, from, next) => {
  if(store.getters.isAuthenticated) {
    next()
    return
  }
  next({name: "Login"})
}

const isNotAuthenticated = (to, from, next) => {
  if(!store.getters.isAuthenticated) {
    next()
    return
  }
  next({name: "Home"})
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: isNotAuthenticated
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
