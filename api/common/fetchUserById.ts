import { db, doc, getDoc } from '@/lib/firestore'
import { User, UserIdRequest, UserType } from '@/utils/types'

export const fetchUserById = async ({ id }: UserIdRequest) => {
  if (!id) throw new Error('User ID is required')
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const data = docSnap.data()
    // Ensure type is properly mapped to UserType enum
    const userType =
      Object.values(UserType).find((type) => type === data.type) ||
      UserType.CUSTORMER

    return {
      id: docSnap.id,
      managedId: data.id,
      type: userType,
      address: data.address || null,
      name: data.name,
      status: data.status,
      email: data.email,
      image: data.image,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    } as User
  }
  return null
}
