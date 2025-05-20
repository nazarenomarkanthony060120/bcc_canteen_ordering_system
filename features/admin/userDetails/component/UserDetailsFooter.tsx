import React from 'react'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { UserKYCStatus } from '@/utils/types'
import DisableAccount from './DisableAccount'
import ApproveDeclineAccount from './ApproveDeclineAccount'
import EnableAccount from './EnableAccount'

interface UserDetailsFooterProps {
  userId: string
}

const UserDetailsFooter = ({ userId }: UserDetailsFooterProps) => {
  const { data: user } = useGetUserByUserId({ id: userId })

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
}

export default UserDetailsFooter
