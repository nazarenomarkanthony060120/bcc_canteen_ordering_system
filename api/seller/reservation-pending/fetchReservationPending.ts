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
  if (!userId) return []

  try {
    // 1. Get all reserved orders
    const reservedOrdersQuery = query(
      collection(db, 'reserved_orders'),
      orderBy('createdAt', 'desc')
    )
    const reservedOrdersSnapshot = await getDocs(reservedOrdersQuery)
    
    // 2. Process each reservation to get food, store, and user details
    const reservations = await Promise.all(
      reservedOrdersSnapshot.docs.map(async (docSnap) => {
        const reservationData = docSnap.data() as ReservationOrders
        
        // Ensure items is an array
        if (!Array.isArray(reservationData.items)) {
          console.warn(`Invalid items data in reservation: ${docSnap.id}`)
          return {
            reservationOrderId: docSnap.id,
            ...reservationData,
            items: []
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
                  food: null,
                  store: null,
                  user: null
                }
              }

              // 3. Get food details using foodId
              const foodDoc = await getDoc(doc(db, 'foods', item.foodId))
              if (!foodDoc.exists()) {
                return {
                  ...item,
                  food: null,
                  store: null,
                  user: null
                }
              }
              
              const foodData = foodDoc.data() as Food
              if (!foodData || !foodData.storeId) {
                return {
                  ...item,
                  food: foodData,
                  store: null,
                  user: null
                }
              }

              const storeId = foodData.storeId

              // 4. Get store details using storeId from food
              const storeDoc = await getDoc(doc(db, 'stores', storeId))
              if (!storeDoc.exists()) {
                return {
                  ...item,
                  food: foodData,
                  store: null,
                  user: null
                }
              }

              const storeData = storeDoc.data() as Store
              if (!storeData || !storeData.userId) {
                return {
                  ...item,
                  food: foodData,
                  store: storeData,
                  user: null
                }
              }

              const storeUserId = storeData.userId

              // 5. Get user details using userId from store
              const userDoc = await getDoc(doc(db, 'users', storeUserId))
              if (!userDoc.exists()) {
                return {
                  ...item,
                  food: foodData,
                  store: storeData,
                  user: null
                }
              }

              const userData = userDoc.data() as User

              // Return the complete item with all related data
              return {
                ...item,
                food: foodData,
                store: storeData,
                user: userData
              }
            } catch (error) {
              console.error('Error processing reservation item:', error)
              return {
                ...item,
                food: null,
                store: null,
                user: null
              }
            }
          })
        )

        // Return the complete reservation with processed items
        return {
          ...reservationData,
          id: docSnap.id,
          items: itemsWithDetails
        }
      })
    )

    // Filter reservations to only include those for the specified user's stores
    const filteredReservations = reservations.filter(reservation => 
      reservation.items.some(item => 
        item.storeOwnerId === userId
      )
    )

    return filteredReservations
  } catch (error) {
    console.error('Error fetching reservations:', error)
    throw error
  }
}
