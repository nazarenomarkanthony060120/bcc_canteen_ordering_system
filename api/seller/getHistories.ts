import { db } from '@/lib/firestore'
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore'
import { GetHistoriesRequest, History } from '@/utils/types'

export const getHistories = async ({
  storeId,
}: GetHistoriesRequest): Promise<History[]> => {
  if (!storeId) throw new Error('Store Owner ID is required')

  const historiesRef = collection(db, 'histories')
  const q = query(
    historiesRef,
    where('storeId', '==', storeId),
    orderBy('createdAt', 'desc'),
    limit(50),
  )

  const querySnapshot = await getDocs(q)
  console.log('querySnapshot', querySnapshot)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    foodId: doc.data().foodId,
    quantity: doc.data().quantity,
    reservationId: doc.data().reservationId,
    storeOwnerId: doc.data().storeOwnerId,
    totalPrice: doc.data().totalPrice,
    userId: doc.data().userId,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }))
}
