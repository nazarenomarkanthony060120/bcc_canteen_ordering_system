import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Food, StoreIdRequest } from '@/utils/types'

export const fetchFoodByStoreId = async ({ id }: StoreIdRequest) => {
  if (!id) throw new Error('Store ID is required')

  const q = query(collection(db, 'foods'), where('id', '==', id))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      name: docSnap.data().name,
      price: docSnap.data().price,
      quantity: docSnap.data().quantity,
      type: docSnap.data().type,
      popularity: docSnap.data().popularity,
      description: docSnap.data().description,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Food[]
  }

  return []
}
