import { View } from 'react-native'
import React from 'react'
import { Food } from '@/utils/types'
import { MasonryFlashList } from '@shopify/flash-list'
import NewlyAddFoodItem from './NewlyAddFoodItem'

interface NewAddFoodListProps {
  foods: Food[] | undefined
}
const NewAddFoodList = ({ foods }: NewAddFoodListProps) => {
  return (
    <MasonryFlashList
      data={foods}
      estimatedItemSize={136}
      renderItem={({ item }) => <NewlyAddFoodItem food={item} />}
      ItemSeparatorComponent={() => <View className="gap-5" />}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default NewAddFoodList
