import { db, doc, getDoc } from '@/lib/firestore'
import { Collection, System, SystemHealth } from '@/utils/collections'

export const fetchSystemHealth = async () => {
  const docRef = doc(db, Collection.HEALTH, System.SYSTEM)
  const docSnap = await getDoc(docRef)
  console.log(docSnap, ' test nko ni')
  if (docSnap.exists()) {
    return docSnap.data().health as SystemHealth
  }
  return SystemHealth.DEAD
}
