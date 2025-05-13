import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_BLACK_ICON } from '@/constants/image'
import { getUserStatus } from '@/features/common/parts/getUserStatus'
import { getUserStatusColor } from '@/features/common/parts/getUserStatusColor'
import { useRouter } from 'expo-router'

interface MemberFormContentsProps {
  user: User
}

const MemberFormContents = ({ user }: MemberFormContentsProps) => {
  const router = useRouter()

  const navigateToUserDetails = () => {
    router.push(`/screens/(admin)/members/userDetails?userId=${user.id}`)
  }

  return (
    <Pressable
      className="bg-white rounded-2xl shadow-md p-4 gap-5 flex-row items-center space-x-4"
      onPress={navigateToUserDetails}
    >
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
    </Pressable>
  )
}

export default MemberFormContents
