import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { User } from '@/utils/types'
import { getUserStatus } from '@/features/common/parts/getUserStatus'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'
import { useFetchStoreByUserId } from '@/hooks/useQuery/common/fetch/useFetchStoreByUserId'
import { getUserStatusColor } from '@/features/common/parts/getUserStatusColor'

interface UserDetailsFormContentsProps {
  user: User | undefined
}

const UserDetailsFormContents = ({ user }: UserDetailsFormContentsProps) => {
  const { data: stores, isFetching } = useFetchStoreByUserId({ id: user?.id })
  if (!user) return null

  const infoList = [
    {
      label: 'Email',
      value: user.email,
      icon: <MaterialIcons name="alternate-email" size={16} color="#4B5563" />,
    },
    {
      label: 'Stores',
      value: isFetching ? <ActivityIndicator /> : stores?.length || 0,
      icon: <MaterialIcons name="numbers" size={16} color="#4B5563" />,
    },
    {
      label: 'Status',
      value: (
        <Text style={{ color: getUserStatusColor(user.status).color }}>
          {getUserStatus(user.status)}
        </Text>
      ),
      icon: <AntDesign name={'infocirlceo'} size={16} color="#4B5563" />,
    },
    {
      label: 'Type',
      value: user.type,
      icon: <MaterialIcons name="category" size={16} color="#4B5563" />,
    },
    {
      label: 'Created Date',
      value: createdAtFormatted(user.createdAt as unknown as Timestamp),
      icon: <Ionicons name={'create-outline'} size={16} color="#4B5563" />,
    },
  ]

  return (
    <SafeAreaView>
      {infoList.map((item, index) => (
        <View key={index} className="flex-start border-b gap-2 p-5">
          <View className="flex-row items-center gap-1">
            <View>{item.icon}</View>
            <Text className="text-sm">{item.label}</Text>
          </View>
          <Text className="text-sm">{item.value}</Text>
        </View>
      ))}
    </SafeAreaView>
  )
}

export default UserDetailsFormContents
