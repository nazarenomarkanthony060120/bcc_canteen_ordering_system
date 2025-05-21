import { View } from 'react-native'
import React from 'react'
import ApproveAccount from './ApproveAccount'
import DeclineAccount from './DeclineAccount'
import Typo from '@/components/common/typo'

interface ApproveDeclineAccountProps {
  userId: string
}

const ApproveDeclineAccount = ({ userId }: ApproveDeclineAccountProps) => {
  return (
    <View className="gap-4">
      <Typo className="text-white text-center text-lg font-semibold mb-2">
        Account Actions
      </Typo>
      <View className="flex-row justify-between items-center gap-4">
        <ApproveAccount userId={userId} />
        <DeclineAccount userId={userId} />
      </View>
    </View>
  )
}

export default ApproveDeclineAccount
