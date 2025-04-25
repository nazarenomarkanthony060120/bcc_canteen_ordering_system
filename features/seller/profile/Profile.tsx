import { ActivityIndicator } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import ProfileHeader from './component/ProfileHeader'
import Seller from '../Seller'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'

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
    <Seller className="flex-1 bg-slate-800 justify-between p-5">
      {content}
    </Seller>
  )
}

export default Profile
