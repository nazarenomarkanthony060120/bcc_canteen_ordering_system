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
    phoneNumber: data.phoneNumber,
    type: UserType.SELLER,
    status: UserKYCStatus.APPLIED,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  await secondaryAuth.signOut()
}
