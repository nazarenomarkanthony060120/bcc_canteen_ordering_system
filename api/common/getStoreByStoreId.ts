import { db } from '@/lib/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { Store, StoreIdRequest } from '@/utils/types'

export const getStoreByStoreId = async ({
  id,
}: StoreIdRequest): Promise<Store | null> => {
  if (!id) throw new Error('Store ID is required')

  const docRef = doc(db, 'stores', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()

    return {
      id: docSnap.id,
      userId: data.userId,
      store: data.store,
      image: data.image,
      gcashImage: data.gcashImage,
      address: data.address,
      status: data.status,
      storeHealth: data.storeHealth,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }

  return null
}
