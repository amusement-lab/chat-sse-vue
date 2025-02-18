import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/login',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/LoginView.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    }
  ]
})

export default router
