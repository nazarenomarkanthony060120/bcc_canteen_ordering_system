import { db, serverTimestamp } from '@/lib/firestore'
import { SaveReservedOrderType } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'
import { sendNewOrderNotification } from '@/utils/notifications/sendNotification'

export const saveReservedOrder = async (data: SaveReservedOrderType) => {
  try {
    const reservedOrderRef = await addDoc(collection(db, 'reserved_orders'), {
      userId: data.userId,
      items: data.cartItems.map((item) => ({
        id: item.id,
        foodId: item.foodId,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        userId: item.userId,
        image: item.image,
        storeId: item.storeId,
        storeOwnerId: item.storeOwnerId,
        status: 1, // PENDING
      })),
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod,
      paid: data.paid || 'Unpaid',
      pickupTime: data.pickupTime || null,
      status: 1, // PENDING
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    // Send notification to each unique seller
    const uniqueSellers = [...new Set(data.cartItems.map((item) => item.storeOwnerId))]
    
    for (const sellerId of uniqueSellers) {
      try {
        await sendNewOrderNotification(sellerId, reservedOrderRef.id)
      } catch (error) {
        console.error(`Error sending notification to seller ${sellerId}:`, error)
      }
    }

    return reservedOrderRef.id
  } catch (error) {
    console.error('Error saving reserved order:', error)
    throw error
  }
}
