import { db } from '@/lib/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Store, StoreStatus } from '@/utils/types'

export const fetchAllStoresByStatus = async () => {
  const q = query(
    collection(db, 'stores'),
    where('status', '==', StoreStatus.APPROVED),
  )
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      userId: docSnap.data().userId,
      image: docSnap.data().image,
      store: docSnap.data().store,
      address: docSnap.data().address,
      status: docSnap.data().status,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Store[]
  }

  return []
}
