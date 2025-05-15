import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { User } from '@/utils/types'
import ProfileFormContents from './ProfileFormContents'
import ProfileFormHeader from './ProfileFormHeader'
import ProfileFormProfile from './ProfileFormProfile'

interface ProfileFormCardProps {
  user: User | undefined
}

const ProfileFormCard = ({ user }: ProfileFormCardProps) => {
  return (
    <SafeAreaView className="gap-5">
      <View className="bg-blue-500 rounded-bl-3xl rounded-br-3xl p-5">
        <ProfileFormHeader />
        <ProfileFormProfile name={user?.name} />
      </View>
      <ProfileFormContents user={user} />
    </SafeAreaView>
  )
}

export default ProfileFormCard
