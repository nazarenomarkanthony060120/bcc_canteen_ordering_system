import { db, serverTimestamp } from '@/lib/firestore'
import { doc, updateDoc } from 'firebase/firestore'

export interface UpdateFoodData {
  foodId: string
  name: string
  image: string
  price: number
  quantity: number
  type: string
  description: string
}

export const updateFood = async (data: UpdateFoodData) => {
  const { foodId, ...updateData } = data
  
  if (!foodId) throw new Error('Food ID is required')

  const foodRef = doc(db, 'foods', foodId)
  
  await updateDoc(foodRef, {
    name: updateData.name,
    image: updateData.image,
    price: Number(updateData.price),
    quantity: Number(updateData.quantity),
    type: updateData.type.trim(),
    description: updateData.description,
    updatedAt: serverTimestamp(),
  })

  return { success: true, foodId }
}

