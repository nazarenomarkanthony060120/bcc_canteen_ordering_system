import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Food } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import Typo from '@/components/common/typo'
import { AntDesign } from '@expo/vector-icons'
import { CANTEEN_IMAGE } from '@/constants/image'
import { useRouter } from 'expo-router'
import { getRatingFromPopularity } from '@/features/common/parts/getFoodPopularity'

interface PopularFoodItemProps {
  food: Food
}

const PopularFoodItem = ({ food }: PopularFoodItemProps) => {
  const router = useRouter()

  const navigateToViewFood = () => {
    router.push(`/screens/common/viewFood?foodId=${food.id}`)
  }

  const popularity = food.popularity / 5
  return (
    <Pressable
      key={food.id}
      onPress={navigateToViewFood}
      className="bg-white m-2 p-4 rounded-lg shadow"
    >
      <ImageWrapper
        className="items-center"
        source={CANTEEN_IMAGE}
        style={{ height: 60, width: 100 }}
      />
      <View className="">
        <Text className="text-sm mt-2 text-center">{food.name}</Text>
        <View className="flex-row justify-between">
          <Text className="text-sm mt-2 text-center">Php: {food.price}</Text>
          <Text className="text-sm mt-2 text-center">Php:</Text>
        </View>

        <Typo
          className="text-sm mt-2"
          isNeed
          icon={<AntDesign name="star" size={16} color="yellow" />}
        >
          {getRatingFromPopularity(popularity)}
        </Typo>
      </View>
    </Pressable>
  )
}

export default PopularFoodItem
