import { db, doc, getDoc, updateDoc, serverTimestamp } from '@/lib/firestore'
import { StoreHealth, StoreIdRequest, StoreStatus } from '@/utils/types'

export const approveStore = async ({ id }: StoreIdRequest) => {
  if (!id) throw new Error('User ID is required')

  const docRef = doc(db, 'stores', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('User not found')
  }

  // Update the user's status to APPROVED
  await updateDoc(docRef, {
    storeHealth: StoreHealth.ACTIVE,
    updatedAt: serverTimestamp(),
  })

  return true
}
