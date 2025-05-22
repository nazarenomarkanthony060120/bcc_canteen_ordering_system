import React from 'react'
import { View } from 'react-native'
import Typo from '@/components/common/typo'

interface CartSummaryProps {
  subtotal: number
  total: number
}

const CartSummary = ({ subtotal, total }: CartSummaryProps) => {
  return (
    <View className="bg-white/90 p-4">
      <View className="flex-row justify-between mb-2">
        <Typo className="text-gray-600">Subtotal</Typo>
        <Typo className="text-gray-800 font-medium">₱{subtotal}</Typo>
      </View>
      <View className="h-px bg-gray-200 my-2" />
      <View className="flex-row justify-between">
        <Typo className="text-gray-800 font-semibold">Total</Typo>
        <Typo className="text-emerald-600 font-semibold">₱{total}</Typo>
      </View>
    </View>
  )
}

export default CartSummary
