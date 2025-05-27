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
    id: data.id,
    name: data.name,
    type: data.type,
    email: data.email,
    password: data.password,
    status:
      data.type !== UserType.SELLER
        ? UserKYCStatus.APPROVED
        : UserKYCStatus.APPLIED,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return user
}
