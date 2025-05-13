import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import ProfileHeader from './component/ProfileHeader'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import Typo from '@/components/common/typo'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenLayout from '../screenLayout/ScreenLayout'

const Profile = () => {
  const { user } = useAuth()

  const { data: userData, isFetching } = useGetUserByUserId({
    id: user?.uid,
  })

  if (isFetching)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
        <Typo className="text-white">Loading</Typo>
      </View>
    )

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-slate-800 justify-between p-5">
        <ProfileHeader />
        <ProfileFormCard user={userData} />
        <ProfileFooter />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default Profile
