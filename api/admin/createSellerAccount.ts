import {
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  serverTimestamp,
  secondaryAuth,
} from '@/lib/firestore'
import {
  CreateSellerAccountRequest,
  UserKYCStatus,
  UserType,
} from '@/utils/types'

export const createSellerAccount = async (data: CreateSellerAccountRequest) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      data.email,
      data.password,
    )
    const user = userCredential.user

    // Create the user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: data.name,
      email: data.email,
      address: data.address,
      password: data.password,
      phoneNumber: data.phoneNumber,
      type: UserType.SELLER,
      status: UserKYCStatus.APPROVED,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await secondaryAuth.signOut()
  } catch (error: any) {
    // Check if the error is because email already exists
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('The email already exists')
    }
    // Re-throw other errors
    throw error
  }
}
