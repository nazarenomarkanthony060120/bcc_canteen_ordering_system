import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firestore'
import { ReservationOrders, ReservedItem } from '@/utils/types'

export const fetchReservationPending = async (userId: string | undefined) => {
  if (!userId) return []

  try {
    const reservedOrdersQuery = query(
      collection(db, 'reserved_orders'),
      orderBy('createdAt', 'desc'),
    )
    const reservedOrdersSnapshot = await getDocs(reservedOrdersQuery)

    const reservations = await Promise.all(
      reservedOrdersSnapshot.docs.map(async (docSnap) => {
        const reservationData = docSnap.data() as ReservationOrders

        if (!Array.isArray(reservationData.items)) {
          console.warn(`Invalid items data in reservation: ${docSnap.id}`)
          return {
            reservationOrderId: docSnap.id,
            ...reservationData,
            items: [],
          }
        }

        const itemsWithDetails = await Promise.all(
          reservationData.items.map(async (item: ReservedItem) => {
            try {
              if (!item || !item.foodId) {
                return {
                  ...item,
                }
              }

              return {
                ...item,
              }
            } catch (error) {
              console.error('Error processing reservation item:', error)
              return {
                ...item,
              }
            }
          }),
        )

        return {
          ...reservationData,
          id: docSnap.id,
          items: itemsWithDetails,
        }
      }),
    )

    // Only return reservations that have items after filtering
    const filteredReservations = reservations.filter((reservation) =>
      reservation.items.some((item) => item.storeOwnerId === userId),
    )
    return filteredReservations
  } catch (error) {
    console.error('Error fetching reservations:', error)
    throw error
  }
}
