import { db } from '@/lib/firestore'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { Food } from '@/utils/types'

export const fetchNewlyAddedFoods = async () => {
  const q = query(collection(db, 'foods'), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      storeId: docSnap.data().storeId,
      name: docSnap.data().name,
      price: docSnap.data().price,
      quantity: docSnap.data().quantity,
      popularity: docSnap.data().popularity,
      description: docSnap.data().description,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Food[]
  }

  return []
}
