import { db } from '@/lib/firestore'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { FoodReservationStatus, ReservationStatus, SaveReservedOrderType } from '@/utils/types'

export const saveReservedOrder = async ({
  userId,
  cartItems,
  totalAmount,
  paymentMethod,
}: SaveReservedOrderType) => {
  try {
    // Validate required fields
    if (!userId || !cartItems || !totalAmount || !paymentMethod) {
      throw new Error('Missing required fields for order reservation')
    }

    // Map cart items and ensure all required fields are present
    const mappedItems = cartItems.map((item) => ({
      id: item.id || '',
      foodId: item.foodId || '',
      userId: item.userId || '',
      quantity: item.quantity || 0,
      totalPrice: item.totalPrice || 0,
      image: item.image || '',
      status: FoodReservationStatus.PENDING
    }))

    const reservedOrder = {
      userId,
      items: mappedItems,
      totalAmount,
      paymentMethod,
      status: ReservationStatus.PENDING,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(
      collection(db, 'reserved_orders'),
      reservedOrder,
    )
    return docRef.id
  } catch (error) {
    console.error('Error saving reserved order:', error)
    throw error
  }
}
