import { View } from 'react-native'
import React from 'react'
import Button from '@/components/common/button'
import { AntDesign } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface UserDetailsFooterProps {
  userId: string
}

const UserDetailsFooter = ({ userId }: UserDetailsFooterProps) => {
  return (
    <View className="flex-row justify-between items-center">
      <Button
        className="w-44 flex-row items-center justify-center gap-2 rounded-lg bg-emerald-700"
        icon={
          <AntDesign className="py-3" name="adduser" size={20} color="white" />
        }
      >
        <Typo className="text-white">Approve</Typo>
      </Button>
      <Button
        className="w-44 flex-row items-center justify-center gap-2 rounded-lg bg-red-700"
        icon={
          <AntDesign className="py-3" name="minus" size={20} color="white" />
        }
      >
        <Typo className="text-white">Decline</Typo>
      </Button>
    </View>
  )
}

export default UserDetailsFooter
