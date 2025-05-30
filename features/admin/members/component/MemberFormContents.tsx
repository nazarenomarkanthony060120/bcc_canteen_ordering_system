import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { User, UserKYCStatus } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'
import { getUserStatus } from '@/features/common/parts/getUserStatus'
import { getUserStatusColor } from '@/features/common/parts/getUserStatusColor'
import { useRouter } from 'expo-router'

interface MemberFormContentsProps {
  user: User
}

const MemberFormContents = ({ user }: MemberFormContentsProps) => {
  const router = useRouter()
  const [pressed, setPressed] = useState(false)

  const navigateToUserDetails = () => {
    router.push(`/screens/(admin)/members/userDetails?userId=${user.id}`)
  }

  const statusColor = getUserStatusColor(user.status)
  const isApplied = user.status === UserKYCStatus.PENDING
  const backgroundColor = isApplied ? '#E0F2FE' : statusColor.color + '25'
  const textColor = isApplied ? '#0284C7' : statusColor.color

  return (
    <Pressable
      className={`rounded-2xl px-4 py-3 flex-row items-center border border-white/20 shadow-lg mb-1 gap-3 ${pressed ? 'bg-[#232946]/60' : 'bg-[#232946]/30'}`}
      onPress={navigateToUserDetails}
      style={{ minHeight: 80 }}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View className="overflow-hidden rounded-xl">
        <ImageWrapper
          source={
            user.image
              ? { uri: `data:image/jpeg;base64,${user.image}` }
              : PERSON_ICON
          }
          style={{ height: 100, width: 100 }}
        />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-white text-lg mb-1">{user.name}</Text>
        <View className="flex-row items-center mb-1">
          <View
            className="px-3.5 py-2 rounded-full"
            style={{
              backgroundColor,
              shadowColor: textColor,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View className="flex-row items-center gap-2">
              <View
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: textColor }}
              />
              <Text
                className="text-xs font-semibold"
                style={{ color: textColor }}
              >
                {getUserStatus(user.status)}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-white text-sm font-medium">{user.email}</Text>
      </View>
    </Pressable>
  )
}

export default MemberFormContents
