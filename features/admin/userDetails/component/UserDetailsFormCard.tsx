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
    <SafeAreaView className="flex-1">
      <View className="p-5">
        <UserDetailsFormHeader />
        <UserDetailsFormProfile image={user?.image} name={user?.name} />
      </View>
      <View className="px-4 pb-6">
        <View className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          <View className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50" />
          <View className="relative">
            <UserDetailsFormContents user={user} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UserDetailsFormCard
