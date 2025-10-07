import { db } from '@/lib/firestore'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { Store } from '@/utils/types'

export const fetchAllStores = async () => {
  const q = query(collection(db, 'stores'), orderBy('updatedAt', 'desc'))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      userId: docSnap.data().userId,
      store: docSnap.data().store,
      address: docSnap.data().address,
      status: docSnap.data().status,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
      image: docSnap.data().image,
      stall: docSnap.data().stall,
    })) as Store[]
  }

  return []
}
