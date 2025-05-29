import { db } from '@/lib/firestore'
import { ReservationIdRequest, ReservationStatus } from '@/utils/types'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export const cancelPendingOrder = async ({
  id,
  foodId,
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
  const updatedItems = reservationData?.items.map((item: any) => {
    if (item.foodId === foodId) {
      return {
        ...item,
        status: ReservationStatus.CANCELLED,
      }
    }
    return item
  })

  await updateDoc(reservationRef, {
    items: updatedItems,
    updatedAt: new Date().toISOString(),
  })
}
