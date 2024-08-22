import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/match',
      name: 'match',
      component: () => import('@/views/MatchView.vue'),
      children: [
        {
          path: 'sent-hearts', // /match/sent-hearts
          name: 'sentHearts',
          component: () => import('@/components/SentHeartsView.vue')
        },
        {
          path: 'received-hearts', // /match/received-hearts
          name: 'receivedHearts',
          component: () => import('@/components/ReceivedHeartsView.vue')
        },
        {
          path: 'status', // /match/status
          name: 'matchStatus',
          component: () => import('@/components/MatchStatusView.vue')
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/views/NoticeView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    }
  ]
})

export default router
