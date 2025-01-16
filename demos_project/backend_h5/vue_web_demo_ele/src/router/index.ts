import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView01 from '../views/Login/LoginView01.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login01',
    name: 'login01',
    component: LoginView01
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
