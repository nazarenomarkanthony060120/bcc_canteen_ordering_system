import { createNotification, CreateNotificationData } from '@/api/notifications/createNotification'

export const sendNewOrderNotification = async (sellerId: string, reservationId: string) => {
  const notification: CreateNotificationData = {
    userId: sellerId,
    title: 'New Order Received! 🎉',
    message: 'You have received a new order. Please confirm it.',
    type: 'order_new',
    reservationId: reservationId,
    read: false,
  }
  
  return await createNotification(notification)
}

export const sendOrderReadyNotification = async (customerId: string, reservationId: string) => {
  const notification: CreateNotificationData = {
    userId: customerId,
    title: 'Order Ready for Pickup! 🛍️',
    message: 'Your order is ready for pickup. Please collect it at the store.',
    type: 'order_ready',
    reservationId: reservationId,
    read: false,
  }
  
  return await createNotification(notification)
}

export const sendOrderExpiredNotification = async (customerId: string, reservationId: string) => {
  const notification: CreateNotificationData = {
    userId: customerId,
    title: 'Order Expired ⏰',
    message: 'Your order has expired. The pickup time has passed.',
    type: 'order_expired',
    reservationId: reservationId,
    read: false,
  }
  
  return await createNotification(notification)
}

export const sendOrderCompletedNotification = async (customerId: string, reservationId: string) => {
  const notification: CreateNotificationData = {
    userId: customerId,
    title: 'Order Completed ✅',
    message: 'Your order has been completed. Thank you for your purchase!',
    type: 'order_completed',
    reservationId: reservationId,
    read: false,
  }
  
  return await createNotification(notification)
}

export const sendOrderCancelledNotification = async (customerId: string, reservationId: string) => {
  const notification: CreateNotificationData = {
    userId: customerId,
    title: 'Order Cancelled ❌',
    message: 'Your order has been cancelled by the seller.',
    type: 'order_cancelled',
    reservationId: reservationId,
    read: false,
  }
  
  return await createNotification(notification)
}

