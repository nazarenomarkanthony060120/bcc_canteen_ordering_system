import { db } from '@/lib/firestore'
import {
  ReservationIdRequest,
  ReservationStatus,
  ReservedItem,
} from '@/utils/types'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export const confirmPendingOrder = async ({
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
  
  // Update the items array with confirmed status for matching items
  const updatedItems = reservationData.items.map((item: ReservedItem) => {
    const matchingFood = foods.find((food) => food?.id === item.foodId)
    if (matchingFood && item.storeOwnerId === userId) {
      return {
        ...item,
        status: ReservationStatus.CONFIRMED,
      }
    }
    return item
  })

  // Update the document in Firestore with the new items
  await updateDoc(reservationRef, {
    items: updatedItems,
  })

  return true
}
