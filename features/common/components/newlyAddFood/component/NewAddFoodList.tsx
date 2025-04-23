import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Food } from '@/utils/types'
import { FlashList } from '@shopify/flash-list'
import NewlyAddFoodItem from './NewlyAddFoodItem'

interface NewAddFoodListProps {
  foods: Food[] | undefined
}
const NewAddFoodList = ({ foods }: NewAddFoodListProps) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row bg-red-500 flex-wrap justify-between">
        <FlashList
          data={foods}
          renderItem={({ item }) => <NewlyAddFoodItem food={item} />}
        />
      </View>
    </SafeAreaView>
  )
}

export default NewAddFoodList
