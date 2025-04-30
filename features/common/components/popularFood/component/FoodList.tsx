import { View } from 'react-native'
import React from 'react'
import { Food } from '@/utils/types'
import { MasonryFlashList } from '@shopify/flash-list'
import PopularFoodItem from './PopularFoodItem'

interface FoodListProps {
  foods: Food[] | undefined
}
const FoodList = ({ foods }: FoodListProps) => {
  return (
    <MasonryFlashList
      data={foods}
      numColumns={2}
      estimatedItemSize={136}
      renderItem={({ item }) => <PopularFoodItem food={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}
export default FoodList
