import { db } from '@/lib/firestore'
import { collection, getDocs, query } from 'firebase/firestore'
import { Store } from '@/utils/types'

export const fetchAllStores = async () => {
  const q = query(collection(db, 'stores'))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      store: docSnap.data().store,
      address: docSnap.data().address,
      status: docSnap.data().status,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    })) as Store[]
  }

  return []
}
