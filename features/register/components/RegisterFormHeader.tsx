import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'

const RegisterFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <Typo className="text-[34px] text-emerald-700 font-bold text-center">
        Register
      </Typo>
      <Typo className="text-lg text-emerald-700 font-bold text-center">
        Create to your account
      </Typo>
    </SafeAreaView>
  )
}

export default RegisterFormHeader
