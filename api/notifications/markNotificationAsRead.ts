import { db, serverTimestamp } from '@/lib/firestore'
import { doc, updateDoc } from 'firebase/firestore'

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    if (!notificationId) {
      throw new Error('Notification ID is required')
    }

    const notificationRef = doc(db, 'notifications', notificationId)
    
    await updateDoc(notificationRef, {
      read: true,
      updatedAt: serverTimestamp(),
    })

    return true
  } catch (error) {
    console.error('Error marking notification as read:', error)
    throw error
  }
}


