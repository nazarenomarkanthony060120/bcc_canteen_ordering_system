import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firestore'
import {
  ReservationOrders,
  Food,
  Store,
  User,
  ReservedItem,
} from '@/utils/types'

export const fetchReservationPending = async (userId: string | undefined) => {
  console.log('userId ni: ', userId)
  if (!userId) return []

  try {
    // 1. Get all reserved orders
    const reservedOrdersQuery = query(
      collection(db, 'reserved_orders'),
      orderBy('createdAt', 'desc'),
    )
    const reservedOrdersSnapshot = await getDocs(reservedOrdersQuery)
    console.log('test ')

    // 2. Process each reservation to get food, store, and user details
    const reservations = await Promise.all(
      reservedOrdersSnapshot.docs.map(async (docSnap) => {
        const reservationData = docSnap.data() as ReservationOrders
        console.log('Raw reservation data:', reservationData)

        // Ensure items is an array
        if (!Array.isArray(reservationData.items)) {
          console.warn(`Invalid items data in reservation: ${docSnap.id}`)
          return {
            reservationOrderId: docSnap.id,
            ...reservationData,
            items: [],
          }
        }

        // Process each item in the reservation
        const itemsWithDetails = await Promise.all(
          reservationData.items.map(async (item: ReservedItem) => {
            try {
              // Validate item has required properties
              if (!item || !item.foodId) {
                return {
                  ...item,
                }
              }

              // Return the complete item with all related data
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

        // Return the complete reservation with processed items
        return {
          ...reservationData,
          id: docSnap.id,
          items: itemsWithDetails,
        }
      }),
    )

    // Filter reservations to only include those for the specified user's stores
    const filteredReservations = reservations.filter((reservation) =>
      reservation.items.some((item) => item.storeOwnerId === userId),
    )

    return filteredReservations
  } catch (error) {
    console.error('Error fetching reservations:', error)
    throw error
  }
}
