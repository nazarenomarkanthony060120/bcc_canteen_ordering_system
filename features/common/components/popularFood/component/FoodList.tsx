import React from 'react'
import { Food } from '@/utils/types'
import { FlashList } from '@shopify/flash-list'
import PopularFoodItem from './PopularFoodItem'

interface FoodListProps {
  foods: Food[] | undefined
}
const FoodList = ({ foods }: FoodListProps) => {
  return (
    <FlashList
      data={foods}
      horizontal
      estimatedItemSize={150}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 8 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <PopularFoodItem food={item} />}
    />
  )
}
export default FoodList
