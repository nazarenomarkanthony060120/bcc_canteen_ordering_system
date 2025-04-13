import { View, Text } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'
import { SafeAreaView } from 'react-native-safe-area-context'

const StoreHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <Text className="text-[34px] text-emerald-700 font-bold text-center">
        My Store
      </Text>
    </SafeAreaView>
  )
}

export default StoreHeader
