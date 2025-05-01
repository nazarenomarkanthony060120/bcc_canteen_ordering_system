import { db, doc, getDoc } from '@/lib/firestore'
import { Collection, System } from '@/utils/collections'

export const fetchSystemHealth = async () => {
  const docRef = doc(db, Collection.HEALTH, System.SYSTEM)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      health: docSnap.data().health,
    }
  }
  return 'test'
}
