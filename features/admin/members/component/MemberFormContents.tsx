import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_BLACK_ICON } from '@/constants/image'
import { getUserStatus } from '@/features/common/parts/getUserStatus'
import { getUserStatusColor } from '@/features/common/parts/getUserStatusColor'

interface MemberFormContentsProps {
  user: User
}

const MemberFormContents = ({ user }: MemberFormContentsProps) => {
  return (
    <SafeAreaView className="bg-white rounded-2xl shadow-md p-4 gap-5 flex-row items-center space-x-4">
      <ImageWrapper
        source={PERSON_BLACK_ICON}
        className="rounded-xl"
        resizeMode="contain"
        style={{ height: 40, width: 60 }}
      />
      <View className="flex-1 gap-1">
        <Text className="font-semibold text-slate-700">{user.name}</Text>
        <Text
          className={`text-sm text-gray-500 font-semibold`}
          style={{ color: getUserStatusColor(user.status).color }}
        >
          {getUserStatus(user.status)}
        </Text>
        <Text className="font-semibold text-slate-700">{user.email}</Text>
      </View>
    </SafeAreaView>
  )
}

export default MemberFormContents
