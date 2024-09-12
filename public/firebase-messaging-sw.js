/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBoBCR5jNFpSiCkQ1Q69q6JyxCibSV-p-8',
  authDomain: 'nowhere-fe86a.firebaseapp.com',
  projectId: 'nowhere-fe86a',
  storageBucket: 'nowhere-fe86a.appspot.com',
  messagingSenderId: '654130187500',
  appId: '1:654130187500:web:469bf3afcfb1d5f6b629c9',
  measurementId: 'G-90WL9VH2B5'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
