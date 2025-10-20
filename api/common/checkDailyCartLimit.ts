import { db } from '@/lib/firestore'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { UserIdRequest } from '@/utils/types'

const DAILY_CART_LIMIT = 10

export const checkDailyCartLimit = async ({ id }: UserIdRequest) => {
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
      // No record found for today, user can add to cart
      return {
        canAddToCart: true,
        currentCount: 0,
        remainingCount: DAILY_CART_LIMIT,
        limit: DAILY_CART_LIMIT,
      }
    }

    // Get the first (should be only) document
    const doc = querySnapshot.docs[0]
    const data = doc.data()
    const currentCount = data.count || 0

    return {
      canAddToCart: currentCount < DAILY_CART_LIMIT,
      currentCount,
      remainingCount: Math.max(0, DAILY_CART_LIMIT - currentCount),
      limit: DAILY_CART_LIMIT,
    }
  } catch (error) {
    console.error('Error checking daily cart limit:', error)
    throw error
  }
}

export type DailyCartLimitResponse = {
  canAddToCart: boolean
  currentCount: number
  remainingCount: number
  limit: number
}
