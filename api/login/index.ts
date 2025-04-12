import { auth, signInWithEmailAndPassword } from '@/lib/firestore'
import { LoginRequest } from '@/utils/types'

export const loginUser = async (data: LoginRequest) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  )
  return userCredential.user
}
