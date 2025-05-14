import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'

interface ProfileFormProfileProps {
  name: string | undefined
}

const ProfileFormProfile = ({ name }: ProfileFormProfileProps) => {
  return (
    <SafeAreaView className="items-center justify-center relative bg-blue-500 my-8 gap-5">
      <Typo className="text-white text-lg">Profile</Typo>
      <ImageWrapper
        className="rounded-full border-2 border-slate-200 pb-10 px-10 pt-10"
        source={PERSON_ICON}
        style={{ height: 50, width: 50 }}
      />
      <Typo className="text-white text-xl">{name}</Typo>
    </SafeAreaView>
  )
}

export default ProfileFormProfile
