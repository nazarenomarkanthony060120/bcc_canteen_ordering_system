import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'
import Typo from '@/components/common/typo'
import { View } from 'react-native'

interface UserDetailsFormProfileProps {
  name: string | undefined
  managedId: string | undefined
}

const UserDetailsFormProfile = ({
  name,
  managedId,
}: UserDetailsFormProfileProps) => {
  return (
    <SafeAreaView className="items-center justify-center relative bg-blue-500 my-6 gap-5">
      <Typo className="text-white text-lg">Profile</Typo>
      <ImageWrapper
        className="rounded-full border-2 border-slate-200 pb-10 px-10 pt-10"
        source={PERSON_ICON}
        style={{ height: 50, width: 50 }}
      />
      <View>
        <Typo className="text-white text-3xl">{name}</Typo>
        <Typo className="text-white text-lg">{managedId}</Typo>
      </View>
    </SafeAreaView>
  )
}

export default UserDetailsFormProfile
