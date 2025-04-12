import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from '@/lib/firestore'
import { RegisterRequest } from '@/utils/types'

export const registerUser = async (data: RegisterRequest) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  )
  const user = userCredential.user
  console.log(data)

  await setDoc(doc(db, 'users', user.uid), {
    id: data.id,
    name: data.name,
    type: data.type,
    email: data.email,
    password: data.password,
    status: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return user
}
