import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks'
import UserDetails from '@/features/admin/userDetails/UserDetails'

const UserDetailsScreen = () => {
  const params = useSearchParams()
  return <UserDetails params={params} />
}

export default UserDetailsScreen
