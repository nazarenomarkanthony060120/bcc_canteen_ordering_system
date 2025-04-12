import { useAuth } from '@/context/auth'
import { db, doc, getDoc, serverTimestamp } from '@/lib/firestore'
import { UserKYC } from '@/utils/types'

const auth = useAuth()

export const userKYCRegister = async (data: UserKYC) => {
  if (!auth.user?.uid) throw new Error('User ID is required')
  const docRef = doc(db, 'users', auth.user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      name: docSnap.data().name,
      phoneNumber: data.phoneNumber,
      address: data.address,
      birthDate: data.birthDate,
      updatedAt: serverTimestamp(),
    }
  }
  return undefined
}
