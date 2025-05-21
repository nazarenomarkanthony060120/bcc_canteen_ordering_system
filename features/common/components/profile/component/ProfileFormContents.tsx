import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { User } from '@/utils/types'
import { getUserStatus } from '@/features/common/parts/getUserStatus'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'
import { getUserStatusColor } from '@/features/common/parts/getUserStatusColor'

interface ProfileFormContentsProps {
  user: User | undefined | null
}

const ProfileFormContents = ({ user }: ProfileFormContentsProps) => {
  if (!user) return null

  const infoList = [
    {
      label: 'Email Address',
      value: user.email,
      icon: <MaterialIcons name="alternate-email" size={22} color="#fff" />,
    },
    {
      label: 'Account Status',
      value: (
        <View className="flex-row items-center">
          <View
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: getUserStatusColor(user.status).color }}
          />
          <Text
            style={{
              color: getUserStatusColor(user.status).color,
              fontWeight: 'bold',
            }}
          >
            {getUserStatus(user.status)}
          </Text>
        </View>
      ),
      icon: <AntDesign name={'infocirlceo'} size={22} color="#fff" />,
    },
    {
      label: 'Account Created',
      value: createdAtFormatted(user.createdAt as unknown as Timestamp),
      icon: <Ionicons name={'create-outline'} size={22} color="#fff" />,
    },
    {
      label: 'Role',
      value: user.type,
      icon: (
        <MaterialIcons name="admin-panel-settings" size={22} color="#fff" />
      ),
    },
  ]

  return (
    <SafeAreaView className="space-y-3">
      {infoList.map((item, index) => (
        <View
          key={index}
          className="bg-white/15 rounded-2xl px-4 py-3 flex-row items-center mb-1"
          style={{ minHeight: 60 }}
        >
          <View className="bg-white/20 p-2 rounded-xl mr-4">{item.icon}</View>
          <View className="flex-1">
            <Text className="text-white/80 text-xs mb-1 font-medium">
              {item.label}
            </Text>
            <Text className="text-white text-base font-bold">{item.value}</Text>
          </View>
        </View>
      ))}
    </SafeAreaView>
  )
}

export default ProfileFormContents
