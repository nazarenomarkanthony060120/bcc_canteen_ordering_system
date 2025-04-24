import { db } from '@/lib/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { Food, FoodIdRequest } from '@/utils/types'

export const getFoodByFoodId = async ({
  id,
}: FoodIdRequest): Promise<Food | null> => {
  if (!id) throw new Error('Food ID is required')

  const docRef = doc(db, 'foods', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()

    return {
      id: docSnap.id,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      description: data.description,
      popularity: data.popularity,
      storeId: data.storeId,
      type: data.type,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  return null
}
