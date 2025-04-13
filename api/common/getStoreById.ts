import { db } from '@/lib/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { Store, StoreIdRequest } from '@/utils/types'

export const getStoreById = async ({
  storeId,
}: StoreIdRequest): Promise<Store | null> => {
  if (!storeId) throw new Error('Store ID is required')

  const docRef = doc(db, 'stores', storeId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()

    return {
      id: docSnap.id,
      store: data.store,
      address: data.address,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  return null
}
