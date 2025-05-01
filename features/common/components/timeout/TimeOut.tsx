import { View } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'

const TimeOut = () => {
  return (
    <View className="flex-1 justify-center items-center gap-5 bg-emerald-300">
      <Typo className="text-3xl font-semibold text-red-500">
        Please Pay your remaining balance to the developer!.
      </Typo>
      <Typo className="text-xl">Thank You</Typo>
    </View>
  )
}

export default TimeOut
