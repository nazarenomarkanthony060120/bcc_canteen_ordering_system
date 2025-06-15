import React from 'react'
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import Typo from '@/components/common/typo'
import { CartAdditionItem } from '@/utils/types'

interface OrderNotificationProps {
  visible: boolean
  onClose: () => void
  orderDetails: {
    items: CartAdditionItem[]
    totalAmount: number
    paymentMethod: string
    pickupTime?: Date
    orderId?: string
  } | null
}

const OrderNotification: React.FC<OrderNotificationProps> = ({
  visible,
  onClose,
  orderDetails,
}) => {
  if (!orderDetails) return null

  const formatPickupTime = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    let dateStr = ''
    if (date.toDateString() === today.toDateString()) {
      dateStr = 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dateStr = 'Tomorrow'
    } else {
      dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      })
    }

    const timeStr = date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })

    return `${dateStr} at ${timeStr}`
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <BlurView intensity={20} className="rounded-3xl overflow-hidden w-[90%] max-w-[400px] max-h-[80%]">
          <View className="bg-white/95 p-6">
            {/* Header */}
            <View className="items-center mb-6">
              <View className="w-16 h-16 bg-emerald-500 rounded-full items-center justify-center mb-4">
                <Typo className="text-white text-2xl">✓</Typo>
              </View>
              <Typo className="text-2xl font-bold text-emerald-600 text-center">
                Order Confirmed!
              </Typo>
              <Typo className="text-gray-600 text-center mt-2">
                Your order has been successfully placed
              </Typo>
            </View>

            {/* Order Details */}
            <ScrollView className="max-h-[300px]" showsVerticalScrollIndicator={false}>
              {/* Order ID */}
              {orderDetails.orderId && (
                <View className="bg-gray-50 p-4 rounded-xl mb-4">
                  <Typo className="text-sm text-gray-600">Order ID</Typo>
                  <Typo className="font-semibold text-gray-800">
                    #{orderDetails.orderId.slice(-8).toUpperCase()}
                  </Typo>
                </View>
              )}

              {/* Items Summary */}
              <View className="mb-4">
                <Typo className="text-lg font-semibold mb-3">Order Summary</Typo>
                <View className="bg-gray-50 p-4 rounded-xl">
                  <View className="flex-row justify-between items-center mb-2">
                    <Typo className="text-gray-600">Total Items</Typo>
                    <Typo className="font-semibold">
                      {orderDetails.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </Typo>
                  </View>
                  {orderDetails.items.map((item, index) => (
                    <View key={index} className="flex-row justify-between items-center py-1">
                      <Typo className="text-sm text-gray-600">
                        Item {index + 1} (Qty: {item.quantity})
                      </Typo>
                      <Typo className="text-sm font-medium text-emerald-600">
                        ₱{item.totalPrice.toFixed(2)}
                      </Typo>
                    </View>
                  ))}
                </View>
              </View>

              {/* Total */}
              <View className="bg-emerald-50 p-4 rounded-xl mb-4">
                <View className="flex-row justify-between items-center">
                  <Typo className="text-lg font-semibold text-emerald-800">
                    Total Amount
                  </Typo>
                  <Typo className="text-xl font-bold text-emerald-600">
                    ₱{orderDetails.totalAmount.toFixed(2)}
                  </Typo>
                </View>
              </View>

              {/* Payment Method */}
              <View className="flex-row justify-between items-center mb-4">
                <Typo className="text-gray-600">Payment Method</Typo>
                <Typo className="font-semibold">{orderDetails.paymentMethod}</Typo>
              </View>

              {/* Pickup Time */}
              {orderDetails.pickupTime && (
                <View className="bg-blue-50 p-4 rounded-xl mb-4">
                  <Typo className="text-sm text-blue-600 mb-1">Pickup Time</Typo>
                  <Typo className="font-semibold text-blue-800">
                    {formatPickupTime(orderDetails.pickupTime)}
                  </Typo>
                </View>
              )}

              {/* Instructions */}
              <View className="bg-yellow-50 p-4 rounded-xl mb-4">
                <Typo className="text-sm text-yellow-800 font-medium mb-2">
                  Next Steps:
                </Typo>
                <Typo className="text-sm text-yellow-700">
                  • Your order is being prepared{'\n'}
                  • Please proceed to the counter to pay in cash{'\n'}
                  • Show this order confirmation if needed{'\n'}
                  • Thank you for your order!
                </Typo>
              </View>
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              onPress={onClose}
              className="bg-emerald-500 py-4 rounded-full mt-4"
            >
              <Typo className="text-white font-semibold text-center text-lg">
                Got it!
              </Typo>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </Modal>
  )
}

export default OrderNotification 