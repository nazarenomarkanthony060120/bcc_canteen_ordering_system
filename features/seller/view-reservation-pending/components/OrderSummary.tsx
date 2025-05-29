import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface OrderSummaryProps {
  paymentMethod: string
  totalAmount: number
}

const OrderSummary = ({ paymentMethod, totalAmount }: OrderSummaryProps) => {
  return (
    <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center mb-4">
          <View className="bg-purple-50 p-3 rounded-full mr-3">
            <MaterialIcons name="summarize" size={24} color="#8B5CF6" />
          </View>
          <Typo className="text-gray-800 font-semibold text-lg">
            Order Summary
          </Typo>
        </View>
        <View className="bg-gray-50 rounded-2xl p-4">
          <View className="flex-row justify-between mb-3">
            <Typo className="text-gray-600">Payment Method</Typo>
            <View className="flex-row items-center">
              <MaterialIcons
                name={paymentMethod === 'Cash' ? 'payments' : 'credit-card'}
                size={16}
                color="#6B7280"
                style={{ marginRight: 4 }}
              />
              <Typo className="text-gray-800 font-semibold">
                {paymentMethod}
              </Typo>
            </View>
          </View>
          <View className="flex-row justify-between">
            <Typo className="text-gray-600">Total Amount</Typo>
            <Typo className="text-emerald-600 font-bold text-lg">
              ₱{totalAmount.toFixed(2)}
            </Typo>
          </View>
        </View>
      </View>
    </BlurView>
  )
}

export default OrderSummary
