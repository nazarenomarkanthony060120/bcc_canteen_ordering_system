import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { User } from '@/utils/types'
import ProfileFormContents from './ProfileFormContents'
import ProfileFormHeader from './ProfileFormHeader'
import ProfileFormProfile from './ProfileFormProfile'

interface ProfileFormCardProps {
  user: User | undefined | null
}

const ProfileFormCard = ({ user }: ProfileFormCardProps) => {
  return (
    <SafeAreaView className="w-full items-center">
      <View className="w-full max-w-md bg-white/10 rounded-3xl p-4 pt-2 mt-4 mb-6 shadow-lg border border-white/20">
        <ProfileFormHeader />
        <ProfileFormProfile name={user?.name} image={user?.image} />
        <View className="mt-2 mb-4">
          <ProfileFormContents user={user} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileFormCard
