import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryList from './component/CategoryList'

const StoreCategory = () => {
  return (
    <SafeAreaView className="gap-3 pb-5">
      <Text className="text-lg font-bold">Stores</Text>
      <CategoryList />
    </SafeAreaView>
  )
}

export default StoreCategory
