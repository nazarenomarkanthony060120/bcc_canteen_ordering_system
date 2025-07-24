import { db } from '@/lib/firestore'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore'
import { UserIdRequest } from '@/utils/types'

export const fetchCartByUserId = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')

  const q = query(collection(db, 'carts'), where('userId', '==', id))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const cartItems = await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const cartData = docSnap.data()
        // Get food details including image
        const foodDoc = await getDoc(doc(db, 'foods', cartData.foodId))
        const foodData = foodDoc.data()

        return {
          id: docSnap.id,
          foodId: cartData.foodId,
          userId: cartData.userId,
          storeId: cartData.storeId,
          gcashImage: cartData.gcashImage,
          storeOwnerId: cartData.storeOwnerId,
          quantity: cartData.quantity,
          totalPrice: cartData.totalPrice,
          createdAt: cartData.createdAt,
          updatedAt: cartData.updatedAt,
          image: foodData?.image ?? '',
        }
      }),
    )

    return cartItems
  }

  return []
}
