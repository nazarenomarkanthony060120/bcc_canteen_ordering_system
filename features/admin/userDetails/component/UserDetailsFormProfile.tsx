import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'
import Typo from '@/components/common/typo'
import { View } from 'react-native'

interface UserDetailsFormProfileProps {
  name: string | undefined
  image: string | undefined
}

const UserDetailsFormProfile = ({
  name,
  image,
}: UserDetailsFormProfileProps) => {
  return (
    <SafeAreaView className="items-center justify-center relative my-6 gap-4">
      <View className="overflow-hidden rounded-xl w-full">
        <ImageWrapper
          source={
            image ? { uri: `data:image/jpeg;base64,${image}` } : PERSON_ICON
          }
          style={{ height: 250, width: '100%', objectFit: 'fill' }}
        />
      </View>
      <View className="items-center">
        <Typo className="text-white text-3xl font-bold mb-1">{name}</Typo>
      </View>
    </SafeAreaView>
  )
}

export default UserDetailsFormProfile
