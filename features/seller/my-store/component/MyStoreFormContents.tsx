import React from 'react'
import { Food } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { View } from 'react-native'
import { Text } from 'react-native'
import { CANTEEN_IMAGE } from '@/constants/image'

interface MyStoreFormContentsProps {
  food: Food
}
const MyStoreFormContents = ({ food }: MyStoreFormContentsProps) => {
  return (
    <SafeAreaView className="bg-white rounded-2xl shadow-md p-4 flex-row items-center space-x-4">
      <ImageWrapper
        source={CANTEEN_IMAGE}
        className="rounded-xl"
        resizeMode="stretch"
        style={{ height: 70, width: 100 }}
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800">{food.name}</Text>
        <Text className="text-sm text-gray-500">{food.description}</Text>
        <Text className="text-base text-green-600 font-bold mt-1">
          {food.price}
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default MyStoreFormContents
