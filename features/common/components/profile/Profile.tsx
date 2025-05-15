import { ScrollView } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenLayout from '../screenLayout/ScreenLayout'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'

const Profile = () => {
  const { user } = useAuth()

  const { data: userData, isLoading } = useGetUserByUserId({
    id: user?.uid,
  })

  if (isLoading) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 justify-between">
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileFormCard user={userData} />
          <ProfileFooter />
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default Profile
