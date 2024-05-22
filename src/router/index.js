import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MainPage from '@/views/MainPage.vue'
import AddExpense from '@/views/AddExpense.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LoginView // or any other component you want to render at the root
    },
    {
      path: '/LoginView',
      name: 'LoginView',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: () => import('@/views/MainPage.vue')
    },
    {
      path: '/AddExpense',
      name: 'AddExpense',
      component: () => import('@/views/AddExpense.vue')
    }
  ]
})

export default router
