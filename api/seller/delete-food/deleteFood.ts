import { db } from '@/lib/firestore'
import { doc, deleteDoc, getDoc } from 'firebase/firestore'

export const deleteFood = async (foodId: string) => {
  if (!foodId) throw new Error('Food ID is required')

  // First get the food document to check if it exists
  const foodRef = doc(db, 'foods', foodId)
  const foodDoc = await getDoc(foodRef)

  if (!foodDoc.exists()) {
    throw new Error('Food item not found')
  }

  // Delete the food document
  await deleteDoc(foodRef)

  return true
}
