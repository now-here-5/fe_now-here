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
      path: '/PWUpdate',
      name: 'PWUpdate',
      component: () => import('@/presentation/views/PWUpdateView.vue'),
      redirect: { name: 'PWUpdate-phone' },
      children: [
        {
          path: 'PWUpdate-phone',
          name: 'PWUpdate-phone',
          component: () => import('@/presentation/components/login/PWAuth.vue')
        },
        {
          path: 'PWUpdate-password',
          name: 'PWUpdate-password',
          component: () => import('@/presentation/components/login/PWUpdate.vue')
        }
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/presentation/views/SignupView.vue'),
      redirect: { name: 'signup-phone' }, // 기본 리다이렉트 설정
      children: [
        {
          path: 'signup-phone',
          name: 'signup-phone',
          component: () => import('@/presentation/components/signup/SignupPhoneView.vue')
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
  const token = authStore.token

  // 기본적으로 허용하는 라우트
  const publicRoutes = ['login', 'error', 'interaction']

  if (publicRoutes.includes(to.name)) {
    return next()
  }

  // 회원가입 경로 처리
  if (to.matched.some((record) => record.path.includes('signup'))) {
    if (eventStore.encodedId && eventStore.eventName) {
      return next()
    }
    return next({ name: 'error' })
  }

  // SMS URL로 직접 접속하는 경우 (매칭 현황, 받은 하트)
  const isHeartOrMatchRoute = ['receivedHearts', 'matchStatus'].includes(to.name)

  if (isHeartOrMatchRoute) {
    if (token) {
      return next() // 토큰이 있으면 바로 이동
    }
    const { eventCode } = to.query
    return eventCode ? next(`/login/${eventCode}`) : next({ name: 'error' })
  }

  // 그 외 경로에 대한 토큰 검증
  if (!token) {
    return next({ name: 'error' })
  }

  // 이벤트 정보가 있는 경우 바로 진행
  if (token && eventStore.encodedId) {
    return next()
  }

  // 이벤트 정보가 없을 경우 이벤트 세부사항 가져오기
  await eventStore.fetchEventDetail()

  if (eventStore.status) {
    return next()
  } else {
    console.error('토큰이 유효하지 않습니다.')
    return next({ name: 'error' })
  }
})

export default router
