import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserDetailsFormHeader from './UserDetailsFormHeader'
import UserDetailsFormProfile from './UserDetailsFormProfile'
import UserDetailsFormContents from './UserDetailsFormContents'
import { User } from '@/utils/types'

interface UserDetailsFormCardProps {
  user: User | undefined
}

const UserDetailsFormCard = ({ user }: UserDetailsFormCardProps) => {
  return (
    <SafeAreaView className="gap-5">
      <View className="bg-blue-500 rounded-bl-3xl rounded-br-3xl p-5">
        <UserDetailsFormHeader />
        <UserDetailsFormProfile name={user?.name} managedId={user?.managedId} />
      </View>
      <UserDetailsFormContents user={user} />
    </SafeAreaView>
  )
}

export default UserDetailsFormCard
