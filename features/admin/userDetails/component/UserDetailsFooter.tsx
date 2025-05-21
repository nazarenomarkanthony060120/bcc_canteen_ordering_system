import React from 'react'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { UserKYCStatus } from '@/utils/types'
import DisableAccount from './DisableAccount'
import ApproveDeclineAccount from './ApproveDeclineAccount'
import EnableAccount from './EnableAccount'
import { View } from 'react-native'

interface UserDetailsFooterProps {
  userId: string
}

const UserDetailsFooter = ({ userId }: UserDetailsFooterProps) => {
  const { data: user } = useGetUserByUserId({ id: userId })

  const renderActionButtons = () => {
    if (
      user?.status === UserKYCStatus.APPROVED ||
      user?.status === UserKYCStatus.APPLIED
    )
      return <DisableAccount userId={userId} />

    if (user?.status === UserKYCStatus.PENDING)
      return <ApproveDeclineAccount userId={userId} />

    if (
      user?.status === UserKYCStatus.DISABLED ||
      user?.status === UserKYCStatus.REJECTED
    )
      return <EnableAccount userId={userId} />

    return null
  }

  return (
    <View className="mt-6 mb-8 px-4">
      <View className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
        {renderActionButtons()}
      </View>
    </View>
  )
}

export default UserDetailsFooter
