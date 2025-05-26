import { db, doc, updateDoc } from '@/lib/firestore'

export const updateProfileImage = async (
  userId: string,
  imageBase64: string,
) => {
  const userRef = doc(db, 'users', userId)
  return await updateDoc(userRef, {
    image: imageBase64,
  })
}
