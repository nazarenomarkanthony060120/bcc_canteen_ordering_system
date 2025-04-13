import { View, Text } from 'react-native'
import React from 'react'
import NewAddFoodList from './component/NewAddFoodList'
import { SafeAreaView } from 'react-native-safe-area-context'

const NewlyAddFood = () => {
  return (
    <SafeAreaView className="gap-3 mb-28">
      <Text className="text-lg font-bold">Newly Added Foods</Text>
      <NewAddFoodList />
    </SafeAreaView>
  )
}

export default NewlyAddFood
