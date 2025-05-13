import React from 'react'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import UserDetailsHeader from './component/UserDetailsHeader'
import UserDetailsFooter from './component/UserDetailsFooter'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserDetailsFormCard from './component/UserDetailsFormCard'

interface UserDetailsProps {
  params: URLSearchParams
}

const UserDetails = ({ params }: UserDetailsProps) => {
  const userId = params.get('userId') ?? ''
  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 justify-between p-5">
        <UserDetailsHeader />
        <UserDetailsFormCard userId={userId} />
        <UserDetailsFooter userId={userId} />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default UserDetails
