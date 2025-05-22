import { db } from '@/lib/firestore'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { Cart } from '@/utils/types'

export const updateCartQuantity = async ({ id, quantity, totalPrice }: { id: string, quantity: number, totalPrice: number }) => {
  if (!id) throw new Error('Cart ID is required')

  const docRef = doc(db, 'carts', id)
  await updateDoc(docRef, {
    quantity,
    totalPrice,
    updatedAt: serverTimestamp(),
  })

  return true
} 