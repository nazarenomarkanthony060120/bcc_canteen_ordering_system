import { ActivityIndicator } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import Admin from '../Admin'
import ProfileHeader from './component/ProfileHeader'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/common/useQuery/useGetUserByUserId'

const Profile = () => {
  const auth = useAuth()

  const { data: userData, isFetching } = useGetUserByUserId({
    id: auth.user?.uid,
  })

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = <ActivityIndicator size="large" color="#0000ff" />
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
    <Admin className="flex-1 bg-slate-800 justify-between p-5">{content}</Admin>
  )
}

export default Profile
