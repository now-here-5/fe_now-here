// src/composables/useNotification.js
import httpClient from '@/infrastructure/http/httpClient'
import { messaging, getToken } from '../firebase'

const requestPermission = async () => {
  if (!window.Notification) alert('No Notification')
  else {
    try {
      const permission = await Notification.requestPermission()
      alert('permission', permission)
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey:
            'BIHejXNCvYuh1XSvQ6XnP347S0Z_DDuZcM_ptKNBhVsEyUzrCzjw2Cc7hvYhJ-PyzNzGtc1X1cAUNXiAu7lkj9A'
        })
        console.log('FCM 토큰:', token)
        // 여기서 서버로 토큰을 전송하는 로직을 추가하세요
        //   const body = {
        //     token: token,
        //     memberId: 47
        //   }
        alert(`FCM 토큰: ${token}`)
        const res = await httpClient.post(
          `/notification/saveFCMToken?token=${token}&memberId=${54}`
        )
        console.log('API res', res)
        alert(`서버에 FCM 토큰 저장 완료`)
      } else {
        console.log('알림 권한이 거부되었습니다.')
        alert('알림 권한이 거부되었습니다.')

        const token = await getToken(messaging, {
          vapidKey:
            'BIHejXNCvYuh1XSvQ6XnP347S0Z_DDuZcM_ptKNBhVsEyUzrCzjw2Cc7hvYhJ-PyzNzGtc1X1cAUNXiAu7lkj9A'
        })
        console.log('FCM 토큰:', token)

        const res = await httpClient.post(
          `/notification/saveFCMToken?token=${token}&memberId=${54}`
        )
        console.log('API res', res)
        alert(`서버에 FCM 토큰 저장 완료`)
      }
    } catch (error) {
      console.error('FCM 토큰 가져오기 실패:', error)
      alert('FCM 토큰 가져오기 실패 혹은 서버에 저장 실패')
    }
  }
}

export { requestPermission }
