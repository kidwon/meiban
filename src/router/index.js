import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/results/:id',
    name: 'results',
    component: () => import('../views/ResultsPage.vue')
  }
]

const router = createRouter({
  // 确保base路径与vue.config.js中的publicPath匹配
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router