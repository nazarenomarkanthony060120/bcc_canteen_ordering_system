import { db } from '@/lib/firestore'
import { User, UserIdRequest, UserType } from '@/utils/types'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const fetchAllMembers = async ({ id }: UserIdRequest) => {
  const q = query(collection(db, 'users'), orderBy('updatedAt', 'desc'))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs
    .filter((docSnap) => docSnap.id !== id)
    .filter((docSnap) => docSnap.data().type === UserType.SELLER)
    .map((docSnap) => ({
      id: docSnap.id,
      name: docSnap.data().name,
      image: docSnap.data().image,
      type: docSnap.data().type,
      status: docSnap.data().status,
      email: docSnap.data().email,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as User[]
}
