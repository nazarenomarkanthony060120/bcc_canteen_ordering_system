import { db, serverTimestamp } from '@/lib/firestore'
import { CreateStore, StoreHealth, StoreStatus } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'

export const createStore = async (data: CreateStore) => {
  return await addDoc(collection(db, 'stores'), {
    userId: data.userId,
    image: data.image,
    store: data.store,
    address: data.address,
    storeStatus: StoreHealth.ACTIVE,
    status: StoreStatus.APPLIED,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
