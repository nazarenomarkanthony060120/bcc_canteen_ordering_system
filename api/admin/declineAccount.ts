import { db, doc, getDoc, updateDoc, serverTimestamp } from '@/lib/firestore'
import { UserIdRequest, UserKYCStatus } from '@/utils/types'

export const declineAccount = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')

  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('User not found')
  }

  // Update the user's status to REJECTED
  await updateDoc(docRef, {
    status: UserKYCStatus.REJECTED,
    updatedAt: serverTimestamp(),
  })

  return true
}
