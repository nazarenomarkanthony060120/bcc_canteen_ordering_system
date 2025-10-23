import { db } from '@/lib/firestore'
import {
  ReservationIdRequest,
  ReservationStatus,
  ReservedItem,
} from '@/utils/types'
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { sendOrderCompletedNotification } from '@/utils/notifications/sendNotification'

export const completePendingOrder = async ({
  id,
  foods,
  userId,
}: ReservationIdRequest) => {
  if (!id) {
    throw new Error('Reservation ID is required')
  }

  const reservationRef = doc(db, 'reserved_orders', id)
  const reservationDoc = await getDoc(reservationRef)

  if (!reservationDoc.exists()) {
    throw new Error('Reservation not found')
  }

  const reservationData = reservationDoc.data()
  const updatedItems = reservationData?.items.map((item: ReservedItem) => {
    const matchingFood = foods.find((food) => food?.id === item.foodId)
    if (matchingFood && item.storeOwnerId === userId) {
      return {
        ...item,
        status: ReservationStatus.COMPLETED,
      }
    }
    return item
  })

  // Update reservation status
  await updateDoc(reservationRef, {
    items: updatedItems,
    paid: 'Paid',
    updatedAt: new Date().toISOString(),
  })

  // Update food quantities and save to histories
  const updatePromises = (reservationData?.items || [])
    .filter((item: ReservedItem) => {
      const matchingFood = foods.find((food) => food?.id === item.foodId)
      return matchingFood && item.storeOwnerId === userId
    })
    .map(async (item: ReservedItem) => {
      const foodRef = doc(db, 'foods', item.foodId)
      const foodDoc = await getDoc(foodRef)

      if (foodDoc.exists()) {
        const foodData = foodDoc.data()
        const newQuantity = foodData.quantity - item.quantity

        await updateDoc(foodRef, {
          quantity: newQuantity,
          updatedAt: new Date().toISOString(),
        })

        // Save to histories collection
        await addDoc(collection(db, 'histories'), {
          storeId: item.storeId,
          storeOwnerId: item.storeOwnerId,
          reservationId: id,
          totalPrice: item.totalPrice,
          quantity: item.quantity,
          foodId: item.foodId,
          userId: item.userId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      }
    })

  await Promise.all(updatePromises)

  // Send notification to customer
  try {
    await sendOrderCompletedNotification(reservationData.userId, id)
  } catch (error) {
    console.error('Error sending completion notification:', error)
  }
}
