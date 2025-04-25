import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Food } from '@/utils/types'
import { MasonryFlashList } from '@shopify/flash-list'
import PopularFoodItem from './PopularFoodItem'

interface FoodListProps {
  foods: Food[] | undefined
}
const FoodList = ({ foods }: FoodListProps) => {
  return (
    <SafeAreaView className="flex-1">
      <MasonryFlashList
        data={foods}
        numColumns={2}
        estimatedItemSize={132}
        renderItem={({ item }) => <PopularFoodItem food={item} />}
        ItemSeparatorComponent={() => <View className="gap-2" />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  )
}
export default FoodList
