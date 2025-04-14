import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'

const AddFoodFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <Typo className="text-[34px] text-emerald-700 font-bold text-center">
        Create your Own Food
      </Typo>
    </SafeAreaView>
  )
}

export default AddFoodFormHeader
