import React from 'react'
import { Food } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { View } from 'react-native'
import { HUMBA_IMAGE } from '@/constants/image'
import Typo from '@/components/common/typo'
import { AntDesign } from '@expo/vector-icons'

interface MyStoreFormContentsProps {
  food: Food
}
const MyStoreFormContents = ({ food }: MyStoreFormContentsProps) => {
  return (
    <SafeAreaView
      key={food.id}
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
        <Typo className="text-sm">Price: {food.price} Php</Typo>
        <Typo className="text-sm">Quantity: {food.quantity}</Typo>
        <View className="flex-row w-full justify-between">
          <View className="flex-row items-center">
            <Typo className="text-sm">Popularity: {food.popularity}</Typo>
            <AntDesign name="star" size={16} color="yellow" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyStoreFormContents
