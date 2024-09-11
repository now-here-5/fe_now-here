// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBoBCR5jNFpSiCkQ1Q69q6JyxCibSV-p-8',
  authDomain: 'nowhere-fe86a.firebaseapp.com',
  projectId: 'nowhere-fe86a',
  storageBucket: 'nowhere-fe86a.appspot.com',
  messagingSenderId: '654130187500',
  appId: '1:654130187500:web:469bf3afcfb1d5f6b629c9',
  measurementId: 'G-90WL9VH2B5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app)

onMessage(messaging, (payload) => {
  console.log('푸시 알림 수신:', payload)
  alert(payload)
  // 여기서 알림 UI를 사용자에게 표시
})

export { messaging, getToken, onMessage }
