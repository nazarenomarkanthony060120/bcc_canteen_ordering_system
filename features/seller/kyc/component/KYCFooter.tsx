import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'

const KYCFooter = () => {
  return (
    <SafeAreaView className="bg-slate-800">
      <View className="bg-slate-900 py-5">
        <Typo className="text-white">You don't need to worry</Typo>
        <Typo className="text-white">Your data is in the safe hand</Typo>
      </View>
    </SafeAreaView>
  )
}

export default KYCFooter
