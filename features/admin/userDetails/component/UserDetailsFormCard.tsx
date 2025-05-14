import { View } from 'react-native'
import React from 'react'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserDetailsFormHeader from './UserDetailsFormHeader'
import UserDetailsFormProfile from './UserDetailsFormProfile'
import UserDetailsFormContents from './UserDetailsFormContents'

interface UserDetailsFormCardProps {
  userId: string
}

const UserDetailsFormCard = ({ userId }: UserDetailsFormCardProps) => {
  const { data: user } = useGetUserByUserId({ id: userId })
  return (
    <SafeAreaView className="gap-5">
      <View className="bg-blue-500 rounded-bl-3xl rounded-br-3xl p-5">
        <UserDetailsFormHeader />
        <UserDetailsFormProfile name={user?.name} />
      </View>
      <UserDetailsFormContents user={user} />
    </SafeAreaView>
  )
}

export default UserDetailsFormCard
