import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/presentation/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/presentation/views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/presentation/views/SignupView.vue')
    },
    {
      path: '/match',
      name: 'match',
      component: () => import('@/presentation/views/MatchView.vue'),
      children: [
        {
          path: 'sent-hearts', // /match/sent-hearts
          name: 'sentHearts',
          component: () => import('@/presentation/components/SentHeartsView.vue')
        },
        {
          path: 'received-hearts', // /match/received-hearts
          name: 'receivedHearts',
          component: () => import('@/presentation/components/ReceivedHeartsView.vue')
        },
        {
          path: 'status', // /match/status
          name: 'matchStatus',
          component: () => import('@/presentation/components/MatchStatusView.vue')
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/presentation/views/ProfileView.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/presentation/views/NoticeView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/presentation/views/ContactView.vue')
    }
  ]
})

export default router
