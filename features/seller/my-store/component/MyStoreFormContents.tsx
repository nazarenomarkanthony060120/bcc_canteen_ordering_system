import { View, Text } from 'react-native'
import React from 'react'
import { Food } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Key } from 'lucide-react-native'

interface MyStoreFormContentsProps {
  foods: Food[] | undefined
}
const MyStoreFormContents = ({ foods }: MyStoreFormContentsProps) => {
  return (
    <SafeAreaView>
      {foods?.map((food, index) => (
        <View key={index}>
          <Text>{food.name} sdf</Text>
          <Text>MyStoreFormContents</Text>
        </View>
      ))}
    </SafeAreaView>
  )
}

export default MyStoreFormContents
