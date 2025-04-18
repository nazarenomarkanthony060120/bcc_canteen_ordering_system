import { ActivityIndicator } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth'
import { useFetchUserById } from '@/hooks/common/fetchUserById'
import ProfileHeader from './component/ProfileHeader'
import Seller from '../Seller'
import ProfileFormCard from './component/ProfileFormCard'
import ProfileFooter from './component/ProfileFooter'

const Profile = () => {
  const auth = useAuth()

  const { data: userData, isFetching } = useFetchUserById({
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
