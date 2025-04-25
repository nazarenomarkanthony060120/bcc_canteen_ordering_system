import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Food } from '@/utils/types'
import { MasonryFlashList } from '@shopify/flash-list'
import NewlyAddFoodItem from './NewlyAddFoodItem'

interface NewAddFoodListProps {
  foods: Food[] | undefined
}
const NewAddFoodList = ({ foods }: NewAddFoodListProps) => {
  return (
    <SafeAreaView className="flex-1">
      <MasonryFlashList
        data={foods}
        numColumns={2}
        estimatedItemSize={100}
        renderItem={({ item }) => <NewlyAddFoodItem food={item} />}
        ItemSeparatorComponent={() => <View className="gap-5" />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  )
}

export default NewAddFoodList
