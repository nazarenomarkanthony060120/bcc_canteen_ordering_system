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
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    )
    const user = userCredential.user

    await setDoc(doc(db, 'users', user.uid), {
      name: data.name,
      type: data.type,
      email: data.email,
      password: data.password,
      status: UserKYCStatus.APPROVED,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return user
  } catch (error: any) {
    // Check if the error is because email already exists
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('The email already exists')
    }
    // Re-throw other errors
    throw error
  }
}
