import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'

const EditFoodFooter = () => {
  return (
    <SafeAreaView edges={['bottom']}>
      <View className="px-4 py-4 items-center">
        <Typo className="text-gray-400 text-xs">
          © 2024 Canteen Ordering System
        </Typo>
      </View>
    </SafeAreaView>
  )
}

export default EditFoodFooter

