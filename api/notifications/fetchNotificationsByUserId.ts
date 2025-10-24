import { db, collection, query, where, orderBy, getDocs } from '@/lib/firestore'

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'order_new' | 'order_ready' | 'order_expired' | 'order_completed' | 'order_cancelled'
  reservationId?: string
  read: boolean
  createdAt: any
  updatedAt: any
}

export const fetchNotificationsByUserId = async (userId: string): Promise<Notification[]> => {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().userId,
        title: doc.data().title,
        message: doc.data().message,
        type: doc.data().type,
        reservationId: doc.data().reservationId,
        read: doc.data().read,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt,
      })) as Notification[]
    }

    return []
  } catch (error) {
    console.error('Error fetching notifications:', error)
    throw error
  }
}


