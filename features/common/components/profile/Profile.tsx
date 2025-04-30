import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import ProfileHeader from './component/ProfileHeader'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { AuthGuard } from '@/components/parts/AuthGaurd'
import Typo from '@/components/common/typo'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const { user } = useAuth()

  const { data: userData, isFetching } = useGetUserByUserId({
    id: user?.uid,
  })

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = (
      <>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Typo className="text-white">Loading</Typo>
        </View>
      </>
    )
  } else {
    content = (
      <>
        <ProfileHeader />
        <ProfileFormCard user={userData} />
        <ProfileFooter />
      </>
    )
  }

  return (
    <AuthGuard>
      <SafeAreaView className="flex-1 bg-slate-800 justify-between p-5">
        {content}
      </SafeAreaView>
    </AuthGuard>
  )
}

export default Profile
