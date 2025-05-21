import { db } from '@/lib/firestore'
import { User, UserIdRequest, UserType } from '@/utils/types'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const fetchAllMembers = async ({ id }: UserIdRequest) => {
  const q = query(collection(db, 'users'), where('type', '==', UserType.SELLER))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs
    .filter((docSnap) => docSnap.id !== id)
    .map((docSnap) => ({
      id: docSnap.id,
      name: docSnap.data().name,
      type: docSnap.data().type,
      status: docSnap.data().status,
      email: docSnap.data().email,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as User[]
}
