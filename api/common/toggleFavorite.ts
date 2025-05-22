import { db } from '@/lib/firestore'
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore'

interface ToggleFavoriteParams {
  userId: string
  foodId: string
}

export const toggleFavorite = async ({ userId, foodId }: ToggleFavoriteParams) => {
  if (!userId || !foodId) {
    throw new Error('User ID and Food ID are required')
  }

  const favoriteRef = doc(db, 'favorites', `${userId}_${foodId}`)
  const favoriteDoc = await getDoc(favoriteRef)

  if (favoriteDoc.exists()) {
    // If favorite exists, remove it
    await deleteDoc(favoriteRef)
    return false
  } else {
    // If favorite doesn't exist, create it
    await setDoc(favoriteRef, {
      userId,
      foodId,
      createdAt: new Date().toISOString()
    })
    return true
  }
} 