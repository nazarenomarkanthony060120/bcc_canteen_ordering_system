import { db, serverTimestamp } from '@/lib/firestore'
import { addDoc, collection } from 'firebase/firestore'

export interface CreateNotificationData {
  userId: string
  title: string
  message: string
  type: 'order_new' | 'order_ready' | 'order_expired' | 'order_completed' | 'order_cancelled'
  reservationId?: string
  read: boolean
}

export const createNotification = async (data: CreateNotificationData) => {
  try {
    const notificationRef = await addDoc(collection(db, 'notifications'), {
      userId: data.userId,
      title: data.title,
      message: data.message,
      type: data.type,
      reservationId: data.reservationId || null,
      read: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return notificationRef.id
  } catch (error) {
    console.error('Error creating notification:', error)
    throw error
  }
}

