import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Typo from '@/components/common/typo'

interface CartFooterProps {
  total: number
  onCheckout: () => void
}

const CartFooter = ({ total, onCheckout }: CartFooterProps) => {
  return (
    <View className="flex-row items-center justify-between">
      <View>
        <Typo className="text-gray-800 font-semibold">Total Amount</Typo>
        <Typo className="text-emerald-600 font-bold text-xl">₱{total}</Typo>
      </View>
      <TouchableOpacity
        className="bg-emerald-600 px-6 py-3 rounded-full"
        onPress={onCheckout}
      >
        <Typo className="text-white font-semibold">Checkout</Typo>
      </TouchableOpacity>
    </View>
  )
}

export default CartFooter
