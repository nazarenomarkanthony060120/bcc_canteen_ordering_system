import { db } from '@/lib/firestore'
import { doc, deleteDoc } from 'firebase/firestore'

export const deleteCart = async (id: string) => {
  if (!id) throw new Error('Cart ID is required')

  const docRef = doc(db, 'carts', id)
  await deleteDoc(docRef)

  return true
}
