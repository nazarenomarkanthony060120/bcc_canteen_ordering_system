import React from 'react'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import UserDetailsFooter from './component/UserDetailsFooter'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserDetailsFormCard from './component/UserDetailsFormCard'
import { ScrollView } from 'react-native'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

interface UserDetailsProps {
  params: URLSearchParams
}

const UserDetails = ({ params }: UserDetailsProps) => {
  const userId = params.get('userId') ?? ''
  const { data: user, isLoading } = useGetUserByUserId({ id: userId })

  if (isLoading) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 justify-between">
        <ScrollView showsVerticalScrollIndicator={false}>
          <UserDetailsFormCard user={user} />
          <UserDetailsFooter userId={userId} />
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default UserDetails
