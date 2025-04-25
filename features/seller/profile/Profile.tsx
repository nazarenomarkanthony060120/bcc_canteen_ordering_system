import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import ProfileHeader from './component/ProfileHeader'
import Seller from '../Seller'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { AuthGuard } from '@/components/parts/AuthGaurd'
import Typo from '@/components/common/typo'

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
      <Seller className="flex-1 bg-slate-800 justify-between p-5">
        {content}
      </Seller>
    </AuthGuard>
  )
}

export default Profile
