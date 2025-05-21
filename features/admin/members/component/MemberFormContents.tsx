import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { User } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_BLACK_ICON, PERSON_ICON } from '@/constants/image'
import { getUserStatus } from '@/features/common/parts/getUserStatus'
import { getUserStatusColor } from '@/features/common/parts/getUserStatusColor'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { UserKYCStatus } from '@/utils/types'

interface MemberFormContentsProps {
  user: User
}

const MemberFormContents = ({ user }: MemberFormContentsProps) => {
  const router = useRouter()
  const [pressed, setPressed] = useState(false)

  const navigateToUserDetails = () => {
    router.push(`/screens/(admin)/members/userDetails?userId=${user.id}`)
  }

  // Choose icon based on status
  let statusIcon: 'verified-user' | 'hourglass-empty' | 'block' =
    'hourglass-empty'
  if (user.status === UserKYCStatus.APPROVED) statusIcon = 'verified-user'
  else if (
    user.status === UserKYCStatus.REJECTED ||
    user.status === UserKYCStatus.DISABLED
  )
    statusIcon = 'block'

  return (
    <Pressable
      className={`rounded-2xl px-4 py-3 flex-row items-center border border-white/20 shadow-lg mb-1 ${pressed ? 'bg-[#232946]/60' : 'bg-[#232946]/30'}`}
      onPress={navigateToUserDetails}
      style={{ minHeight: 80 }}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View className="bg-white/20 rounded-full mr-4 p-4">
        <ImageWrapper
          source={PERSON_ICON}
          className="rounded-full"
          resizeMode="contain"
          style={{ height: 48, width: 48 }}
        />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-white text-lg mb-1">{user.name}</Text>
        <View className="flex-row items-center mb-1">
          {/* Status badge with icon */}
          <View
            className=" flex-row px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: getUserStatusColor(user.status).color + '22',
            }}
          >
            <MaterialIcons
              name={statusIcon}
              size={14}
              color={getUserStatusColor(user.status).color}
            />
            <Text
              className="ml-1 text-xs font-bold"
              style={{ color: getUserStatusColor(user.status).color }}
            >
              {getUserStatus(user.status)}
            </Text>
          </View>
        </View>
        <Text className="text-white text-sm font-medium">{user.email}</Text>
      </View>
    </Pressable>
  )
}

export default MemberFormContents
