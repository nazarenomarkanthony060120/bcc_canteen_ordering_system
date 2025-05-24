import { db } from '@/lib/firestore'
import { StoreIdRequest, StoreStatus } from '@/utils/types'
import { doc, updateDoc } from 'firebase/firestore'

export const pendingStore = async ({ id }: StoreIdRequest) => {
  if (!id) {
    throw new Error('Store ID is required')
  }

  const storeRef = doc(db, 'stores', id)

  await updateDoc(storeRef, {
    status: StoreStatus.PENDING,
    updatedAt: new Date().toISOString(),
  })
}
