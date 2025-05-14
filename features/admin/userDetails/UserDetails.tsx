import React from 'react'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import UserDetailsFooter from './component/UserDetailsFooter'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserDetailsFormCard from './component/UserDetailsFormCard'
import { ScrollView } from 'react-native'

interface UserDetailsProps {
  params: URLSearchParams
}

const UserDetails = ({ params }: UserDetailsProps) => {
  const userId = params.get('userId') ?? ''
  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 justify-between">
        <ScrollView showsVerticalScrollIndicator={false}>
          <UserDetailsFormCard userId={userId} />
          <UserDetailsFooter userId={userId} />
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default UserDetails
