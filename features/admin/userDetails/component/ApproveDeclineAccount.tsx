import { View } from 'react-native'
import React from 'react'
import ApproveAccount from './ApproveAccount'
import DeclineAccount from './DeclineAccount'

interface ApproveDeclineAccountProps {
  userId: string
}

const ApproveDeclineAccount = ({ userId }: ApproveDeclineAccountProps) => {
  return (
    <View className="flex-row justify-between items-center p-5">
      <ApproveAccount userId={userId} />
      <DeclineAccount userId={userId} />
    </View>
  )
}

export default ApproveDeclineAccount
