import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface CartHeaderProps {
  totalItems: number
}

const CartHeader = ({ totalItems }: CartHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <View>
        <Typo className="text-gray-800 text-xl font-semibold">Your Cart</Typo>
        <Typo className="text-gray-500">{totalItems} items</Typo>
      </View>
      <View className="bg-emerald-50 p-2 rounded-full">
        <MaterialIcons name="shopping-cart" size={24} color="#10B981" />
      </View>
    </View>
  )
}

export default CartHeader
