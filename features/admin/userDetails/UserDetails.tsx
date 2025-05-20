import React, { useState } from 'react'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import UserDetailsFooter from './component/UserDetailsFooter'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserDetailsFormCard from './component/UserDetailsFormCard'
import { ScrollView, RefreshControl } from 'react-native'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

interface UserDetailsProps {
  params: URLSearchParams
}

const UserDetails = ({ params }: UserDetailsProps) => {
  const userId = params.get('userId') ?? ''
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { data: user, isLoading, refetch } = useGetUserByUserId({ id: userId })

  const onRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refetch()
    } catch (error) {
      console.error('Error refreshing user details:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isLoading && !isRefreshing) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 justify-between">
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <UserDetailsFormCard user={user} />
          <UserDetailsFooter userId={userId} />
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default UserDetails
