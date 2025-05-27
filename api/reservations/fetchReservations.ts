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

  try {
    const reservedOrderQuery = query(
      collection(db, 'reserved_orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    )

    const querySnapshot = await getDocs(reservedOrderQuery)
    const reservations = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const reservationData = docSnapshot.data()

        if (!reservationData.items || !Array.isArray(reservationData.items)) {
          console.warn('Invalid items data in reservation:', docSnapshot.id)
          return {
            id: docSnapshot.id,
            ...reservationData,
            items: [],
          }
        }

        // Get food and store data for each item
        const itemsWithDetails = await Promise.all(
          reservationData.items.map(async (item: any) => {
            if (!item || !item.foodId) {
              console.warn('Invalid item data:', item)
              return {
                ...item,
                food: {
                  id: 'unknown',
                  name: 'Invalid Item',
                  description: '',
                  price: 0,
                  type: '',
                  store: {
                    id: '',
                    name: 'Unknown Store',
                    address: '',
                  },
                },
              }
            }

            try {
              // Get food details
              const foodDocRef = doc(db, 'foods', item.foodId)
              const foodDoc = await getDoc(foodDocRef)
              
              if (!foodDoc.exists()) {
                console.warn(`Food document not found for ID: ${item.foodId}`)
                return {
                  ...item,
                  food: {
                    id: item.foodId,
                    name: 'Unknown Food',
                    description: '',
                    price: 0,
                    type: '',
                    store: {
                      id: '',
                      name: 'Unknown Store',
                      address: '',
                    },
                  },
                }
              }

              const foodData = foodDoc.data() as FoodData
              if (!foodData.storeId) {
                console.warn(`Food data missing storeId for ID: ${item.foodId}`)
                return {
                  ...item,
                  food: {
                    ...foodData,
                    store: {
                      id: '',
                      name: 'Unknown Store',
                      address: '',
                    },
                  },
                }
              }

              // Get store details using the store ID from food data
              const storeDocRef = doc(db, 'stores', foodData.storeId)
              const storeDoc = await getDoc(storeDocRef)
              
              if (!storeDoc.exists()) {
                console.warn(`Store document not found for ID: ${foodData.storeId}`)
                return {
                  ...item,
                  food: {
                    ...foodData,
                    store: {
                      id: foodData.storeId,
                      name: 'Unknown Store',
                      address: '',
                    },
                  },
                }
              }

              const storeData = storeDoc.data() as StoreData
              return {
                ...item,
                food: {
                  ...foodData,
                  store: {
                    id: storeData.id,
                    name: storeData.store,
                    address: storeData.address,
                  },
                },
              }
            } catch (error) {
              console.error('Error fetching item details:', error)
              return {
                ...item,
                food: {
                  id: item.foodId,
                  name: 'Error Loading Food',
                  description: '',
                  price: 0,
                  type: '',
                  store: {
                    id: '',
                    name: 'Error Loading Store',
                    address: '',
                  },
                },
              }
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
  } catch (error) {
    console.error('Error in fetchReservations:', error)
    throw error
  }
}
