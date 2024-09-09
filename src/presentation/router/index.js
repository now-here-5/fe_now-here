import { createRouter, createWebHistory } from 'vue-router'
import { useEventStore } from '@/presentation/stores/eventStore.js'
import { useAuthStore } from '@/presentation/stores/authStore.js'

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
      redirect: { name: 'signup_mobileAuth' }, // 기본 리다이렉트 설정
      children: [
        {
          path: 'signup-mobileAuth',
          name: 'signup-mobileAuth',
          component: () => import('@/presentation/components/signup/SignupPhoneAuthView.vue')
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
          path: '/editName', // /match/sent-hearts
          name: 'editName',
          component: () => import('@/presentation/components/profile/EditNameView.vue')
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
          path: '/deleteAccount', // /match/sent-hearts
          name: 'deleteAccount',
          component: () => import('@/presentation/components/settings/DeleteAccountView.vue')
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

// 라우터 가드 추가
router.beforeEach(async (to, from, next) => {
  const store_Event = useEventStore()
  const store_Auth = useAuthStore()

  // 페이지가 'login' 또는 'error'일 경우 이동을 허용
  if (to.name === 'login' || to.name === 'error' || to.name === 'interaction') {
    next()
    return
  }

  // 'signup' 페이지 또는 'signup'의 자식 라우트로 이동을 허용
  if (to.matched.some((record) => record.path.includes('signup'))) {
    console.log('signup 페이지로 이동합니다.')
    // store에서 eventId eventName 값이 있는지 확인
    if (store_Event.eventId && store_Event.eventName) {
      console.log('eventId 및 eventName이 설정되어 있습니다.')
      next() // 값이 있으면 이동 허용
    } else {
      console.log('eventId 또는 eventName이 설정되지 않았습니다.')
      next({ name: 'error' }) // 값이 없으면 'error' 페이지로 이동
    }
    return
  }

  // 로컬 스토리지에서 토큰 확인
  const token = store_Auth.token
  console.log('토큰:', token)
  if (!token) {
    // 토큰이 없으면 'error' 페이지로 이동
    console.log('토큰이 없습니다.')
    next({ name: 'error' })
    return
  }

  try {
    // 서버에서 이벤트 정보를 받아와 토큰 유효성 판단
    await store_Event.fetchEventDetail()

    if (store_Event.status === true) {
      console.log('토큰이 유효합니다.')
      console.log('event_detail:', store_Event.event_detail)
      next()
    } else {
      console.error('토큰이 유효하지 않습니다.')
      next({ name: 'error' })
    }
  } catch (error) {
    console.error('API 요청 실패:', error)
    next({ name: 'error' })
    status.value = false // 에러 발생 시 status를 false로 설정
  }

  // 기본적으로 next()를 호출
  return next()
})

export default router
