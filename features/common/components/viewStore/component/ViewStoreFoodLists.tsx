import { Pressable, View } from 'react-native'
import React from 'react'
import { Food } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import Typo from '@/components/common/typo'
import { HUMBA_IMAGE } from '@/constants/image'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import Button from '@/components/common/button'

interface ViewStoreFoodListsProps {
  food: Food
}
const ViewStoreFoodLists = ({ food }: ViewStoreFoodListsProps) => {
  const router = useRouter()

  const navigateToViewFood = () => {
    router.push(`/screens/common/viewFood?foodId=${food.id}`)
  }

  return (
    <Pressable
      key={food.id}
      onPress={navigateToViewFood}
      className="w-full bg-slate-200 mb-3 pb-4 rounded-xl gap-1 justify-center"
    >
      <ImageWrapper
        className="items-center"
        source={HUMBA_IMAGE}
        style={{
          width: 400,
          height: 250,
          resizeMode: 'cover',
        }}
      />
      <Typo className="text-xl font-semibold text-center">{food.name}</Typo>
      <View className="items-start gap-2 px-5">
        <View className="flex-row items-start gap-3">
          <Typo className="text-sm">Description:</Typo>
          <View className="items-start" style={{ flex: 1 }}>
            <Typo className="text-sm leading-6">{food.description}</Typo>
          </View>
        </View>
        <Typo className="text-sm">Php: {food.price}</Typo>
        <Typo className="text-sm">Quantity: {food.quantity}</Typo>
        <View className="flex-row w-full justify-between">
          <View className="flex-row items-center">
            <Typo className="text-sm">Popularity: {food.popularity}</Typo>
            <AntDesign name="star" size={16} color="yellow" />
          </View>
          <Button
            className="bg-[#f7d320] rounded-lg flex-row gap-3 p-1"
            onPress={navigateToViewFood}
            icon={<AntDesign name="shoppingcart" size={20} color={'white'} />}
          >
            <Typo className="text-white font-bold">Buy</Typo>
          </Button>
        </View>
      </View>
    </Pressable>
  )
}

export default ViewStoreFoodLists
