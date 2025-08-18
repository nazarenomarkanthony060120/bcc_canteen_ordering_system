import { db } from '@/lib/firestore'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { UserIdRequest } from '@/utils/types'

export const incrementDailyCartCount = async ({ id }: UserIdRequest) => {
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
      // No record found for today, create new one with count = 1
      await addDoc(collection(db, 'daily_cart_limits'), {
        userId: id,
        date: today,
        count: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return { newCount: 1 }
    }

    // Update existing record
    const docData = querySnapshot.docs[0]
    const currentCount = docData.data().count || 0
    const newCount = currentCount + 1

    await updateDoc(doc(db, 'daily_cart_limits', docData.id), {
      count: newCount,
      updatedAt: serverTimestamp(),
    })

    return { newCount }
  } catch (error) {
    console.error('Error incrementing daily cart count:', error)
    throw error
  }
}
