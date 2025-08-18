import { db } from '@/lib/firestore'
import { doc, deleteDoc, getDoc } from 'firebase/firestore'
import { decrementDailyCartCount } from './decrementDailyCartCount'

export const deleteCart = async (id: string) => {
  if (!id) throw new Error('Cart ID is required')

  // First get the cart document to retrieve userId
  const cartRef = doc(db, 'carts', id)
  const cartDoc = await getDoc(cartRef)

  if (!cartDoc.exists()) {
    throw new Error('Cart item not found')
  }

  const cartData = cartDoc.data()
  const userId = cartData.userId

  // Delete the cart document
  await deleteDoc(cartRef)

  // Decrement the daily cart count for this user
  if (userId) {
    try {
      await decrementDailyCartCount({ id: userId })
    } catch (error) {
      console.error('Error decrementing daily cart count:', error)
      // Don't throw error here as cart is already deleted
    }
  }

  return true
}
