import { db } from '@/lib/firestore'
import { AddCartRequest } from '@/utils/types'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { checkDailyCartLimit } from './checkDailyCartLimit'
import { incrementDailyCartCount } from './incrementDailyCartCount'

export const userAddCart = async (data: AddCartRequest) => {
  // Check if user has reached daily limit
  const limitCheck = await checkDailyCartLimit({ id: data.userId })

  if (!limitCheck.canAddToCart) {
    throw new Error(
      `Daily cart limit reached! You can only add ${limitCheck.limit} items per day. You have already added ${limitCheck.currentCount} items today.`,
    )
  }

  // Add to cart
  const cartDoc = await addDoc(collection(db, 'carts'), {
    foodId: data.foodId,
    userId: data.userId,
    storeOwnerId: data.storeOwnerId,
    storeId: data.storeId,
    gcashImage: data.gcashImage,
    totalPrice: Number(data.totalPrice),
    quantity: Number(data.quantity),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  // Increment daily count
  await incrementDailyCartCount({ id: data.userId })

  return cartDoc
}
