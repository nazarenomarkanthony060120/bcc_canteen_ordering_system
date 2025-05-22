import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Cart, UserIdRequest } from '@/utils/types'

export const fetchCartByUserId = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')

  const q = query(collection(db, 'carts'), where('userId', '==', id))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      foodId: docSnap.data().foodId,
      userId: docSnap.data().userId,
      quantity: docSnap.data().quantity,
      totalPrice: docSnap.data().totalPrice,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Cart[]
  }

  return []
} 