import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

if (!Firebase.apps.length) {
  Firebase.initializeApp({
    apiKey: "AIzaSyBmcoTaY6BSQdwjmx5a_X-FO11-gqY3x3Q",
    authDomain: "nuxt-app-f5b1a.firebaseapp.com",
    projectId: "nuxt-app-f5b1a",
    storageBucket: "nuxt-app-f5b1a.appspot.com",
    messagingSenderId: "885241329236",
    appId: "1:885241329236:web:7ec5256c55d5109b215fc1",
    measurementId: "G-VJSCC4W4TN"
  });
}

export default (context, inject) => {
  const $fb = {
    app: Firebase.app,
    auth: Firebase.auth,
    firestore: Firebase.firestore,
    storage:Firebase.storage,
  }
  const $storageUrl = 'https://storage.googleapis.com/nuxt-app-f5b1a.appspot.com/'
  // どこからでも「this.$fb」で呼び出せる
  inject('fb', $fb)
  inject('storageUrl', $storageUrl)
}
