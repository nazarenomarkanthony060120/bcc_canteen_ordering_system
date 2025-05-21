import { ScrollView, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenLayout from '../screenLayout/ScreenLayout'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
// import ProfileFormHeader from './component/ProfileFormHeader'

const Profile = () => {
  const { user } = useAuth()

  const { data: userData, isLoading } = useGetUserByUserId({
    id: user?.uid,
  })

  if (isLoading) return <LoadingIndicator />

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView className="flex-1 justify-center items-center px-2 w-full">
        {/* <ProfileFormHeader /> */}
        <ScrollView showsVerticalScrollIndicator={false} className="w-full">
          <ProfileFormCard user={userData} />
          <ProfileFooter />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Profile
