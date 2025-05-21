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
    <SafeAreaView className="items-center justify-center relative my-6 gap-4">
      <View className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
        <ImageWrapper
          className="rounded-full"
          source={PERSON_ICON}
          style={{ height: 80, width: 80 }}
        />
      </View>
      <View className="items-center">
        <Typo className="text-white text-3xl font-bold mb-1">{name}</Typo>
        <View className="bg-white/20 px-4 py-1 rounded-full">
          <Typo className="text-white/90 text-sm">{managedId}</Typo>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UserDetailsFormProfile
