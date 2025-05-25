import React from 'react'
import { View, ImageSourcePropType } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  image: string | null | undefined
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
  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(id, quantity - 1)
    }
  }

  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1)
  }

  return (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View className="flex-row items-center flex-1">
      <View className="overflow-hidden rounded-xl">
                <ImageWrapper
                  source={
                    image
                      ? { uri: `data:image/jpeg;base64,${image}` }
                      : CANTEEN_IMAGE
                  }
                  style={{ height: 90, width: 100 }}
                />
              </View>
        <View className="flex-1">
          <Typo className="text-gray-800 font-semibold mb-1">{name}</Typo>
          <Typo className="text-gray-600 text-sm">Store: {store}</Typo>
          <Typo className="text-emerald-600 font-semibold">₱{price}</Typo>
        </View>
      </View>
      <View className="flex-row items-center">
        <MaterialIcons
          name="remove-circle-outline"
          size={24}
          color="#10B981"
          onPress={handleDecrement}
        />
        <Typo className="mx-3 text-gray-800">{quantity}</Typo>
        <MaterialIcons
          name="add-circle-outline"
          size={24}
          color="#10B981"
          onPress={handleIncrement}
        />
      </View>
    </View>
  )
}

export default CartItem
