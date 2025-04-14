import { Text, SafeAreaView } from 'react-native'
import React from 'react'
import FoodList from './component/FoodList'

const PopularFood = () => {
  return (
    <SafeAreaView className="gap-3 pb-5">
      <Text className="text-lg font-semibold">Popular Foods</Text>
      <FoodList />
    </SafeAreaView>
  )
}

export default PopularFood
