import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firestore'
import { Reservation } from '@/utils/types'

export const fetchReservations = async (userId: string | undefined) => {
  if (!userId) return []

  const q = query(
    collection(db, 'reserved_orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Reservation[]
} 