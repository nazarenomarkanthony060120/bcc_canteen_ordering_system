import { Pressable } from 'react-native'
import React from 'react'
import { Food } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import { CANTEEN_IMAGE } from '@/constants/image'
import { useRouter } from 'expo-router'

interface NewlyAddFoodItemProps {
  food: Food
}
const NewlyAddFoodItem = ({ food }: NewlyAddFoodItemProps) => {
  const router = useRouter()

  const navigateToViewFood = () => {
    router.push(`/screens/common/viewFood?foodId=${food.id}`)
  }
  return (
    <Pressable
      key={food.id}
      onPress={navigateToViewFood}
      className="w-[95%] h-fit bg-gray-100 mb-4 rounded-xl gap-1 justify-center p-3"
    >
      <ImageWrapper
        className="items-center"
        source={CANTEEN_IMAGE}
        style={{ height: 60, width: 100 }}
      />
      <SafeAreaView className="items-start">
        <Typo className="text-sm mt-2 text-center">{food.name}</Typo>
        <Typo className="text-sm mt-2 text-center">Php: {food.price}</Typo>
      </SafeAreaView>
    </Pressable>
  )
}

export default NewlyAddFoodItem
