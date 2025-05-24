import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Store, UserIdRequest } from '@/utils/types'

export const fetchStoreById = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')

  const q = query(collection(db, 'stores'), where('userId', '==', id))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      image: docSnap.data().image,
      store: docSnap.data().store,
      address: docSnap.data().address,
      status: docSnap.data().status,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Store[]
  }

  return []
}
