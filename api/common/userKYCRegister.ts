import { db, doc, getDoc, serverTimestamp } from '@/lib/firestore'
import { UpdateProfile, UserKYC } from '@/utils/types'
import { updateProfile } from './updateProfile'

export const userKYCRegister = async (data: UserKYC) => {
  const docRef = doc(db, 'users', data.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const updatedData = {
      phoneNumber: data.phoneNumber,
      address: data.address,
      birthDate: data.birthDate,
      status: 1,
      updatedAt: serverTimestamp(),
    } as UpdateProfile
    return await updateProfile(updatedData, docRef)
  }

  return false
}
