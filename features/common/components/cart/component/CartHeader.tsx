import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'

interface CartHeaderProps {
  totalItems: number
}

const CartHeader = ({ totalItems }: CartHeaderProps) => {
  const router = useRouter()

  const handleReservationPress = () => {
    router.push('/screens/common/reservationList')
  }

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between mb-4"
      onPress={handleReservationPress}
    >
      <View>
        <Typo className="text-gray-800 text-xl font-semibold">Your Cart</Typo>
        <Typo className="text-gray-500">{totalItems} items</Typo>
      </View>
      <View className="flex-row items-center">
        <View className="bg-emerald-50 p-2 rounded-full mr-2">
          <MaterialIcons name="shopping-cart" size={24} color="#10B981" />
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
      </View>
    </TouchableOpacity>
  )
}

export default CartHeader
