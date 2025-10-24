import { db, collection, query, where, getDocs, updateDoc, doc } from '@/lib/firestore'
import { ReservationStatus, ReservationOrders } from '@/utils/types'
import { sendOrderExpiredNotification } from './sendNotification'

export const checkExpiredOrders = async () => {
  try {
    const currentTime = new Date()
    
    // Query orders that are Ready for Pickup
    const q = query(
      collection(db, 'reserved_orders')
    )

    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return
    }

    const expiredOrders: string[] = []

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data() as ReservationOrders
      
      // Check if order has pickup time and if it has passed
      if (data.pickupTime) {
        const pickupTime = new Date(data.pickupTime)
        const timeDiff = currentTime.getTime() - pickupTime.getTime()
        const hoursPassed = timeDiff / (1000 * 60 * 60)

        // If pickup time has passed by more than 1 hour and order is ready for pickup
        const hasReadyForPickupItems = data.items.some(
          (item) => item.status === ReservationStatus.READY_FOR_PICKUP
        )

        if (hoursPassed > 1 && hasReadyForPickupItems) {
          expiredOrders.push(docSnap.id)
          
          // Update items to cancelled status
          const updatedItems = data.items.map((item) => {
            if (item.status === ReservationStatus.READY_FOR_PICKUP) {
              return {
                ...item,
                status: ReservationStatus.CANCELLED,
              }
            }
            return item
          })

          // Update the order
          await updateDoc(doc(db, 'reserved_orders', docSnap.id), {
            items: updatedItems,
            updatedAt: new Date().toISOString(),
          })

          // Send expiration notification
          try {
            await sendOrderExpiredNotification(data.userId, docSnap.id)
          } catch (error) {
            console.error(`Error sending expiration notification for order ${docSnap.id}:`, error)
          }
        }
      }
    }

    return expiredOrders
  } catch (error) {
    console.error('Error checking expired orders:', error)
    throw error
  }
}


