import { View } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { LOGO_ICON } from '@/constants/image'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <ImageWrapper source={LOGO_ICON} style={{ height: 150, width: 280 }} />
      <Typo className="text-[34px] text-emerald-700 font-bold text-center">
        Welcome Back
      </Typo>
      <Typo className="text-lg text-emerald-700 font-bold text-center">
        Login to your account
      </Typo>
    </SafeAreaView>
  )
}

export default LoginFormHeader
