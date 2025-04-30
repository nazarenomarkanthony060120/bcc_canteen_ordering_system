import { View } from 'react-native'
import React, { useState } from 'react'
import { Food, Store } from '@/utils/types'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { SPLASH_ICON } from '@/constants/image'
import Button from '@/components/common/button'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { getRatingFromPopularity } from '@/features/common/parts/getFoodPopularity'

interface ViewFoodFormCardProps {
  food: Food | null | undefined
  store: Store | null | undefined
}

const ViewFoodFormCard = ({ food, store }: ViewFoodFormCardProps) => {
  const [foodPrice, setFoodPrice] = useState<number>(food?.price ?? 0)
  const [foodQuantity, setFoodQuantity] = useState<number>(1)
  const [foodIncrementLimit, setFoodIncrementLimit] = useState<Boolean>(false)
  const [foodDecrementLimit, setFoodDecrementLimit] = useState<Boolean>(false)
  const increment = () => {
    if (foodQuantity >= (food?.quantity ?? 0)) {
      setFoodIncrementLimit(true)
      return foodQuantity
    }

    const newQuantity = foodQuantity + 1
    setFoodQuantity(newQuantity)
    setFoodPrice(newQuantity * (food?.price ?? 0))

    setFoodDecrementLimit(false)
    setFoodIncrementLimit(false)
  }

  const decrement = () => {
    if (foodQuantity <= 0) {
      setFoodDecrementLimit(true)
      return foodQuantity
    }

    const newQuantity = foodQuantity - 1
    setFoodQuantity(newQuantity)
    setFoodPrice(newQuantity * (food?.price ?? 0))

    setFoodDecrementLimit(false)
    setFoodIncrementLimit(false)
  }

  return (
    <View className="justify-between flex-1 p-5">
      <View className="gap-5">
        <ImageWrapper source={SPLASH_ICON} className="items-center" />
        <Typo className="text-xl font-semibold">
          {food?.name} - {store?.store}
        </Typo>
        <Typo className="text-center leading-6">{food?.description}</Typo>
      </View>
      <View className="flex-row justify-center items-center gap-3">
        <Button
          className="flex-row justify-center items-center rounded-lg border border-slate-600 bg-green-100 p-3 gap-3"
          icon={<AntDesign name="star" size={20} color={'#f7d320'} />}
        >
          <View className="flex-row gap-2">
            <Typo>{getRatingFromPopularity(food?.popularity ?? 0)}</Typo>
            <Typo>Like it!</Typo>
          </View>
        </Button>
      </View>

      <View className="flex-row justify-center items-center gap-4">
        <Button className="bg-white p-3 rounded-lg" onPress={increment}>
          <Entypo name="plus" size={20} />
        </Button>
        <Typo>{foodQuantity}</Typo>
        <Button className="bg-white p-3 rounded-lg" onPress={decrement}>
          <Entypo name="minus" size={20} />
        </Button>
      </View>
      <View>
        {foodIncrementLimit && (
          <Typo>You reached the quantity limit of the food!.</Typo>
        )}
        {foodDecrementLimit && (
          <Typo>You reached the quantity limit of the food!.</Typo>
        )}
      </View>

      <View className="justify-between flex-row">
        <View className="flex-row items-center justify-center gap-2">
          <MaterialCommunityIcons name="currency-php" size={20} />
          <Typo className="text-2xl font-semibold">{foodPrice}</Typo>
        </View>

        <Button
          className="bg-[#f7d320] rounded-lg flex-row gap-3 p-5"
          icon={<AntDesign name="shoppingcart" size={20} color={'white'} />}
        >
          <Typo className="text-white font-bold">Add Cart</Typo>
        </Button>
      </View>
    </View>
  )
}

export default ViewFoodFormCard
