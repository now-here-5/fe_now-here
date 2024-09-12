import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/presentation/stores/authStore.js'
import { useEventStore } from '@/presentation/stores/eventStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/presentation/views/HomeView.vue')
    },
    {
      path: '/login/:encodedId',
      name: 'login',
      component: () => import('@/presentation/views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/presentation/views/SignupView.vue'),
      redirect: { name: 'signup-ID' }, // 기본 리다이렉트 설정
      children: [
        {
          path: 'signup-ID',
          name: 'signup-ID',
          component: () => import('@/presentation/components/signup/SignupIDView.vue')
        },
        {
          path: 'signup-password',
          name: 'signup-password',
          component: () => import('@/presentation/components/signup/SignupPasswordView.vue')
        },
        {
          path: 'signup-profile',
          name: 'signup-profile',
          component: () => import('@/presentation/components/signup/SignupProfileView.vue')
        }
      ]
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
      path: '/editProfile', // /match/sent-hearts
      name: 'editProfile',
      component: () => import('@/presentation/views/EditProfile.vue'),
      children: [
        {
          path: '/editSelf', // /match/sent-hearts
          name: 'editSelf',
          component: () => import('@/presentation/components/profile/EditSelfView.vue')
        },
        {
          path: '/editSnsID', // /match/sent-hearts
          name: 'editSnsID',
          component: () => import('@/presentation/components/profile/EditSnsIDView.vue')
        },
        {
          path: '/editName', // /match/sent-hearts
          name: 'editName',
          component: () => import('@/presentation/components/profile/EditNameView.vue')
        },
        {
          path: '/editBirth', // /match/sent-hearts
          name: 'editBirth',
          component: () => import('@/presentation/components/profile/EditBirthView.vue')
        },
        {
          path: '/editMBTI', // /match/sent-hearts
          name: 'editMBTI',
          component: () => import('@/presentation/components/profile/EditMBTIView.vue')
        }
      ]
    },
    {
      path: '/settings', // /match/sent-hearts
      name: 'settings',
      component: () => import('@/presentation/views/SettingsView.vue'),
      children: [
        {
          path: '/withdraw', // /match/sent-hearts
          name: 'withdraw',
          component: () => import('@/presentation/components/settings/WithdrawView.vue')
        }
      ]
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/presentation/views/NoticeView.vue')
    },
    {
      path: '/interaction/:type',
      name: 'interaction',
      component: () => import('@/presentation/views/InteractionView.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/presentation/views/ErrorView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const eventStore = useEventStore()
  if (to.name === 'login' || to.name === 'error' || to.name === 'interaction') {
    next()
    return
  }
  if (to.matched.some((record) => record.path.includes('signup'))) {
    if (eventStore.eventId && eventStore.eventName) {
      next()
    } else {
      next({ name: 'error' })
    }
    return
  }
  const token = authStore.token
  if (!token) {
    next({ name: 'error' })
    return
  }
  if (token && eventStore.encodedId) {
    next() // 'next()'만 호출
    return
  } else {
    await eventStore.fetchEventDetail()
    if (eventStore.status === true) {
      next()
    } else {
      console.error('토큰이 유효하지 않습니다.')
      next({ name: 'error' })
    }
  }
})

export default router
