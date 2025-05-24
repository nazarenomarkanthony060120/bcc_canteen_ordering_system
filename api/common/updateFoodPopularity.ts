import { db } from '@/lib/firestore'
import { doc, updateDoc, increment } from 'firebase/firestore'

interface UpdateFoodPopularityParams {
  foodId: string
  increment: boolean // true to increment, false to decrement
}

export const updateFoodPopularity = async ({
  foodId,
  increment: shouldIncrement,
}: UpdateFoodPopularityParams) => {
  if (!foodId) {
    throw new Error('Food ID is required')
  }

  const foodRef = doc(db, 'foods', foodId)

  await updateDoc(foodRef, {
    popularity: increment(shouldIncrement ? 1 : -1),
    updatedAt: new Date().toISOString(),
  })
}
