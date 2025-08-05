import { db, collection, query, where, orderBy, getDocs } from '@/lib/firestore'
import { FeedBack } from '@/utils/types'

export const fetchFeedbacksByFoodId = async (foodId: string) => {
  try {
    if (!foodId) {
      throw new Error('Food ID is required')
    }

    const q = query(
      collection(db, 'feedbacks'),
      where('foodId', '==', foodId),
      orderBy('createdAt', 'desc'),
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        foodId: docSnap.data().foodId,
        userId: docSnap.data().userId,
        rating: docSnap.data().rating,
        feedback: docSnap.data().feedback,
        createdAt: docSnap.data().createdAt,
        updatedAt: docSnap.data().updatedAt,
      })) as FeedBack[]
    }

    return []
  } catch (error) {
    console.error('Error fetching feedbacks by foodId:', error)
    throw error
  }
}
