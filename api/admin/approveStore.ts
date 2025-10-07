import {
  db,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  collection,
} from '@/lib/firestore'
import { StoreIdRequest, StoreStatus } from '@/utils/types'

export const approveStore = async ({ id }: StoreIdRequest) => {
  if (!id) throw new Error('User ID is required')

  // get the total length of the stores collection
  const storesRef = collection(db, 'stores')
  const storesSnap = await getDocs(storesRef)
  const totalStores = storesSnap.size

  const docRef = doc(db, 'stores', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('User not found')
  }

  // Update the user's status to APPROVED
  await updateDoc(docRef, {
    status: StoreStatus.APPROVED,
    stall: totalStores,
    updatedAt: serverTimestamp(),
  })

  return true
}
