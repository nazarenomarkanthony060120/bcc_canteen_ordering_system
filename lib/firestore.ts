import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
  FieldValue,
  orderBy,
  limit,
  updateDoc,
  Timestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const secondaryApp = initializeApp(firebaseConfig, 'secondary')
const auth = getAuth(app)
const secondaryAuth = getAuth(secondaryApp)
const db = getFirestore(app)

export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
  onAuthStateChanged,
  User,
  FieldValue,
  orderBy,
  limit,
  updateDoc,
  Timestamp,
  secondaryAuth,
}
