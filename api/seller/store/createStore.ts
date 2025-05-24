import { db, serverTimestamp } from '@/lib/firestore'
import { CreateStore } from '@/utils/types'
import { addDoc, collection } from 'firebase/firestore'

export const createStore = async (data: CreateStore) => {
  return await addDoc(collection(db, 'stores'), {
    userId: data.userId,
    image: data.image,
    store: data.store,
    address: data.address,
    status: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}
