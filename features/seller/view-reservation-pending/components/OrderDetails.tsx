import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { Food, ReservedItem } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { useAuth } from '@/context/auth'
import { getItemCount } from '@/features/common/parts/getItemsCount'

interface OrderDetailsProps {
  items: ReservedItem[]
  foods: (Food | null | undefined)[]
}

interface OrderItemProps {
  item: ReservedItem
  food: Food
}

const OrderItem = ({ item, food }: OrderItemProps) => {
  return (
    <View className="flex-row items-center">
      <View className="overflow-hidden rounded-xl">
        <ImageWrapper
          source={
            food.image
              ? { uri: `data:image/jpeg;base64,${food.image}` }
              : CANTEEN_IMAGE
          }
          style={{ height: 120, width: 120 }}
        />
      </View>
      <View className="flex-1 ml-4">
        <Typo className="text-gray-800 font-semibold text-lg mb-1">
          {food.name}
        </Typo>
        <View className="flex-row justify-center items-center mb-2">
          <View className="bg-emerald-50 px-2 py-1 rounded-full mr-2">
            <Typo className="text-emerald-600 text-sm">
              {getItemCount({ items: item.quantity })}
            </Typo>
          </View>
        </View>
        <Typo className="text-emerald-600 font-bold text-lg">
          ₱{item.totalPrice.toFixed(2)}
        </Typo>
      </View>
    </View>
  )
}

const OrderDetails = ({ items, foods }: OrderDetailsProps) => {
  const auth = useAuth()
  const filteredItems = items.filter(
    (item) => auth.user?.uid === item.storeOwnerId,
  )

  return (
    <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center mb-4">
          <View className="bg-amber-50 p-3 rounded-full mr-3">
            <MaterialIcons name="receipt-long" size={24} color="#F59E0B" />
          </View>
          <Typo className="text-gray-800 font-semibold text-lg">
            Order Details
          </Typo>
        </View>
        <View className="bg-gray-50 rounded-2xl gap-3 p-4">
          {filteredItems.map((item) => {
            const food = foods.find((f) => f?.id === item.foodId)
            if (!food) return null

            return (
              <OrderItem
                key={`${item.foodId}-${item.quantity}`}
                item={item}
                food={food}
              />
            )
          })}
        </View>
      </View>
    </BlurView>
  )
}

export default OrderDetails
