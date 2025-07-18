import { db, serverTimestamp } from '@/lib/firestore'
import { CreateStore, StoreHealth, StoreStatus } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'

export const createStore = async (data: CreateStore) => {
  return await addDoc(collection(db, 'stores'), {
    userId: data.userId,
    image: data.storeImage, // arn dli ma guba ang data remain image field instead of storeImage
    gcashImage: data.gcashImage,
    store: data.store,
    address: data.address,
    storeStatus: StoreHealth.ACTIVE,
    status: StoreStatus.APPLIED,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
