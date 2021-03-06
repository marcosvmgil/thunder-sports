import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDV9LLH3Pwb6QiFWWnfGe-FiKzTdhxUEKs",
  authDomain: "thunder-sports.firebaseapp.com",
  projectId: "thunder-sports",
  storageBucket: "thunder-sports.appspot.com",
  messagingSenderId: "552847492510",
  appId: "1:552847492510:web:2e0e246e39dc544159c28f",
  measurementId: "G-BSCZF44G9F",
})

export const firestore = firebase.firestore();
export const auth = app.auth()
// export default app
export default firebase
