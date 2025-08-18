import { db } from '@/lib/firestore'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { UserIdRequest } from '@/utils/types'

export const decrementDailyCartCount = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  try {
    // Query for today's cart limit record
    const q = query(
      collection(db, 'daily_cart_limits'),
      where('userId', '==', id),
      where('date', '==', today),
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      // No record found for today, nothing to decrement
      return { newCount: 0 }
    }

    // Update existing record
    const docData = querySnapshot.docs[0]
    const currentCount = docData.data().count || 0
    
    // Don't let count go below 0
    const newCount = Math.max(0, currentCount - 1)

    await updateDoc(doc(db, 'daily_cart_limits', docData.id), {
      count: newCount,
      updatedAt: serverTimestamp(),
    })

    return { newCount }
  } catch (error) {
    console.error('Error decrementing daily cart count:', error)
    throw error
  }
}
