import { db } from '@/lib/firestore'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Cart } from '@/utils/types'

interface SaveReservedOrderParams {
  userId: string
  cartItems: Cart[]
  totalAmount: number
  paymentMethod: 'Cash' | 'GCash'
}

export const saveReservedOrder = async ({
  userId,
  cartItems,
  totalAmount,
  paymentMethod,
}: SaveReservedOrderParams) => {
  try {
    const reservedOrder = {
      userId,
      items: cartItems,
      totalAmount,
      paymentMethod,
      status: 'reserved',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'reserved_orders'), reservedOrder)
    return docRef.id
  } catch (error) {
    console.error('Error saving reserved order:', error)
    throw error
  }
} 