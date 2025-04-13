import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'

const AddStoreFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <Typo className="text-[34px] text-emerald-700 font-bold text-center">
        Create your Own Store
      </Typo>
      <Typo className="text-lg text-emerald-700 font-bold text-center">
        Complete your registration
      </Typo>
    </SafeAreaView>
  )
}

export default AddStoreFormHeader
