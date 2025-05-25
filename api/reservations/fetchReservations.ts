import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firestore'
import { Reservation } from '@/utils/types'

export const fetchReservations = async (userId: string | undefined) => {
  if (!userId) return []

  const reservedOrderQuery = query(
    collection(db, 'reserved_orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const foodsQuery = query(
    collection(db, 'foods'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  
  const storeQuery = query(
    collection(db, 'stores'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const querySnapshot = await getDocs(reservedOrderQuery)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Reservation[]
} 