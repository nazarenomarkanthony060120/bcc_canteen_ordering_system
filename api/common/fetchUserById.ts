import { db, doc, getDoc } from '@/lib/firestore'
import { User, UserIdRequest } from '@/utils/types'

export const fetchUserById = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      managedId: docSnap.data().id,
      type: docSnap.data().type,
      name: docSnap.data().name,
      status: docSnap.data().status,
      email: docSnap.data().email,
      image: docSnap.data().image,
      createdAt: docSnap.data().createdAt,
      updatedAt: docSnap.data().updatedAt,
    } as User
  }
  return null
}
