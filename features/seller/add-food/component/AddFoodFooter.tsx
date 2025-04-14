import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'

const AddFoodFooter = () => {
  return (
    <SafeAreaView className="gap-3 mb-10">
      <Typo className="text-emerald-700 text-lg font-bold">
        Make your Food Delicious
      </Typo>
    </SafeAreaView>
  )
}

export default AddFoodFooter
