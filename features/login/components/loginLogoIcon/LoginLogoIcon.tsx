import { Image } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { LOGO_ICON } from '@/constants/image'

const LoginLogoIcon = () => {
  return (
    <Animated.View entering={FadeInDown.delay(500).duration(1500).damping(1).springify()} className="relative items-center w-full pt-16">
      <Image className="h-[100px] w-[100px] rounded-full"
        resizeMode="contain"
        source={LOGO_ICON}
      />
    </Animated.View>
  )
}

export default LoginLogoIcon