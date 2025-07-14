import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from '@/lib/firestore'
import { RegisterRequest, UserKYCStatus, UserType } from '@/utils/types'

export const registerUser = async (data: RegisterRequest) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  )
  const user = userCredential.user

  await setDoc(doc(db, 'users', user.uid), {
    name: data.name,
    type: UserType.CUSTORMER,
    email: data.email,
    password: data.password,
    status: UserKYCStatus.APPROVED,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return user
}
