import { db } from '@/lib/firestore'
import { AddCartRequest } from '@/utils/types'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export const userAddCart = async (data: AddCartRequest) => {
  return await addDoc(collection(db, 'carts'), {
    foodId: data.foodId,
    userId: data.userId,
    storeOwnerId: data.storeOwnerId,
    storeId: data.storeId,
    totalPrice: Number(data.totalPrice),
    quantity: Number(data.quantity),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
