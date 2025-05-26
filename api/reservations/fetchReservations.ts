import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
  DocumentData,
} from 'firebase/firestore'
import { db } from '@/lib/firestore'
import { Reservation } from '@/utils/types'

interface FoodData {
  id: string
  name: string
  description: string
  price: number
  type: string
  storeId: string
}

interface StoreData {
  id: string
  store: string
  address: string
}

export const fetchReservations = async (userId: string | undefined) => {
  if (!userId) return []

  const reservedOrderQuery = query(
    collection(db, 'reserved_orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  )

  const querySnapshot = await getDocs(reservedOrderQuery)
  const reservations = await Promise.all(
    querySnapshot.docs.map(async (docSnapshot) => {
      const reservationData = docSnapshot.data()

      // Get food and store data for each item
      const itemsWithDetails = await Promise.all(
        reservationData.items.map(async (item: any) => {
          // Get food details
          const foodDocRef = doc(db, 'foods', item.foodId)
          const foodDoc = await getDoc(foodDocRef)
          const foodData = foodDoc.data() as FoodData

          // Get store details using the store ID from food data
          const storeDocRef = doc(db, 'stores', foodData.storeId)
          const storeDoc = await getDoc(storeDocRef)
          const storeData = storeDoc.data() as StoreData

          return {
            ...item,
            food: {
              id: foodData.id,
              name: foodData.name,
              description: foodData.description,
              price: foodData.price,
              type: foodData.type,
              store: {
                id: storeData.id,
                name: storeData.store,
                address: storeData.address,
              },
            },
          }
        }),
      )

      return {
        id: docSnapshot.id,
        ...reservationData,
        items: itemsWithDetails,
      }
    }),
  )

  return reservations as Reservation[]
}
