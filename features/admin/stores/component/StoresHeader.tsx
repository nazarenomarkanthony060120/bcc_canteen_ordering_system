import { View, Text } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'

const StoresHeader = () => {
  return (
    <View className="mb-5">
      <Typo className="text-[24px] text-emerald-700 font-bold text-center">
        Check and Verify the Stores
      </Typo>
    </View>
  )
}

export default StoresHeader
