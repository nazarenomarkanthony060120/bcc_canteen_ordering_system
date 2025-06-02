import { db } from '@/lib/firestore'
import { CancelReservationIdRequest } from '@/utils/types'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export const cancelReservation = async ({ id }: CancelReservationIdRequest) => {
  if (!id) {
    throw new Error('Reservation ID is required')
  }
  console.log('id ni: ', id)

  const reservationRef = doc(db, 'reserved_orders', id)
  const reservationDoc = await getDoc(reservationRef)

  if (!reservationDoc.exists()) {
    throw new Error('Reservation not found')
  }

  const reservationData = reservationDoc.data()
  const items = reservationData.items || []

  // Update all items' status to 3
  const updatedItems = items.map((item: any) => ({
    ...item,
    status: 3,
  }))

  await updateDoc(reservationRef, {
    status: 3, // Set status to cancelled
    items: updatedItems,
    updatedAt: new Date().toISOString(),
  })
}
