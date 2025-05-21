import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'
import { View } from 'react-native'

interface ProfileFormProfileProps {
  name: string | undefined
  managedId: string | undefined
}

const ProfileFormProfile = ({ name, managedId }: ProfileFormProfileProps) => {
  return (
    <SafeAreaView className="items-center justify-center my-4">
      <View className="bg-white/30 rounded-full p-2 mb-2">
        <ImageWrapper
          className="rounded-full p-4"
          source={PERSON_ICON}
          style={{ height: 80, width: 80 }}
        />
      </View>
      <Typo className="text-white text-2xl font-bold mb-1">{name}</Typo>
      <Typo className="text-white text-base opacity-80 mb-2">{managedId}</Typo>
    </SafeAreaView>
  )
}

export default ProfileFormProfile
