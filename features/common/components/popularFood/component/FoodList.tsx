import { View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Food } from '@/utils/types'
import { FlashList } from '@shopify/flash-list'
import PopularFoodItem from './PopularFoodItem'

interface FoodListProps {
  foods: Food[] | undefined
}
const FoodList = ({ foods }: FoodListProps) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row flex-wrap justify-between">
        <FlashList
          data={foods}
          renderItem={({ item }) => <PopularFoodItem food={item} />}
        />
      </View>
    </SafeAreaView>
  )
}

export default FoodList
