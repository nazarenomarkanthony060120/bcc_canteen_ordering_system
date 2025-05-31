import { db } from '@/lib/firestore'
import { User, UserIdRequest } from '@/utils/types'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const fetchAllUsers = async ({ id }: UserIdRequest) => {
  const q = query(collection(db, 'users'), orderBy('updatedAt', 'desc'))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs
    .filter((docSnap) => docSnap.id !== id)
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
