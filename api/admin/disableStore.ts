import { db, doc, getDoc, updateDoc, serverTimestamp } from '@/lib/firestore'
import { StoreIdRequest, StoreStatus } from '@/utils/types'

export const disableStore = async ({ id }: StoreIdRequest) => {
  if (!id) throw new Error('Store ID is required')

  const docRef = doc(db, 'stores', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('Store not found')
  }

  // Update the user's status to DISABLED
  await updateDoc(docRef, {
    status: StoreStatus.DISABLED,
    updatedAt: serverTimestamp(),
  })

  return true
}
