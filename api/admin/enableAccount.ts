import { db, doc, getDoc, updateDoc, serverTimestamp } from '@/lib/firestore'
import { UserIdRequest, UserKYCStatus } from '@/utils/types'

export const enableAccount = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')

  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('User not found')
  }

  // Update the user's status to APPLIED
  await updateDoc(docRef, {
    status: UserKYCStatus.APPLIED,
    updatedAt: serverTimestamp(),
  })

  return true
}
