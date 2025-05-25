import { db } from '@/lib/firestore'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { Food, StoreStatus } from '@/utils/types'

export const fetchAllPopularFoods = async () => {
  const storesQuery = query(
    collection(db, 'stores'),
    where('status', '==', StoreStatus.APPROVED),
  )
  const storesSnapshot = await getDocs(storesQuery)
  const approvedStoreIds = storesSnapshot.docs.map((doc) => doc.id)

  const foodsQuery = query(
    collection(db, 'foods'),
    orderBy('popularity', 'desc'),
    limit(8),
  )
  const foodsSnapshot = await getDocs(foodsQuery)

  if (!foodsSnapshot.empty) {
    return foodsSnapshot.docs
      .filter((food) => approvedStoreIds.includes(food.data().id))
      .filter((food) => food.data().quantity > 0)
      .map((docSnap) => ({
        id: docSnap.id,
        storeId: docSnap.data().id,
        name: docSnap.data().name,
        image: docSnap.data().image,
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
