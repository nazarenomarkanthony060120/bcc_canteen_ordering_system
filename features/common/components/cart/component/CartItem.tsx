import React from 'react'
import { View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  store: string
  onQuantityChange: (id: string, newQuantity: number) => void
}

const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  store,
  onQuantityChange,
}: CartItemProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onQuantityChange(id, newQuantity)
    }
  }

  return (
    <View className="mb-4 last:mb-0">
      <View className="flex-row gap-4">
        <Image source={{ uri: image }} className="w-20 h-20 rounded-xl" />
        <View className="flex-1">
          <Typo className="text-gray-800 font-semibold">{name}</Typo>
          <Typo className="text-gray-500 text-sm">{store}</Typo>
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center gap-2">
              <MaterialIcons
                name="remove-circle"
                size={24}
                color="#10B981"
                onPress={() => handleQuantityChange(quantity - 1)}
              />
              <Typo className="text-gray-800 font-medium">{quantity}</Typo>
              <MaterialIcons
                name="add-circle"
                size={24}
                color="#10B981"
                onPress={() => handleQuantityChange(quantity + 1)}
              />
            </View>
            <Typo className="text-gray-800 font-semibold">
              ₱{price * quantity}
            </Typo>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartItem
