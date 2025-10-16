import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { User, UserType } from '@/utils/types'
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

  const baseInfoList = [
    {
      label: 'Email',
      value: (
        <Text className="text-gray-800 font-semibold text-base">
          {user.email}
        </Text>
      ),
      icon: <MaterialIcons name="alternate-email" size={22} color="#4B5563" />,
      description: 'User contact email address',
    },
    // {
    //   label: 'Status',
    //   value: (
    //     <View className="flex-row items-center gap-2">
    //       <View
    //         className="w-2.5 h-2.5 rounded-full"
    //         style={{ backgroundColor: getUserStatusColor(user.status).color }}
    //       />
    //       <Text
    //         style={{ color: getUserStatusColor(user.status).color }}
    //         className="font-medium"
    //       >
    //         {getUserStatus(user.status)}
    //       </Text>
    //     </View>
    //   ),
    //   icon: <AntDesign name="infocirlceo" size={22} color="#4B5563" />,
    //   description: 'Current account status',
    // },
    {
      label: 'Type',
      value: (
        <Text className="text-gray-800 font-semibold text-base">
          {user.type}
        </Text>
      ),
      icon: <MaterialIcons name="category" size={22} color="#4B5563" />,
      description: 'User account type',
    },
    {
      label: 'Created Date',
      value: (
        <Text className="text-gray-800 font-semibold text-base">
          {createdAtFormatted(user.createdAt as unknown as Timestamp)}
        </Text>
      ),
      icon: <Ionicons name="create-outline" size={22} color="#4B5563" />,
      description: 'Account creation date',
    },
  ]

  // Add stores info only for sellers
  const storesInfo =
    user.type === UserType.SELLER
      ? {
          label: 'Stores',
          value: isFetching ? (
            <View className="flex-row items-center gap-2">
              <ActivityIndicator size="small" color="#4B5563" />
              <Text className="text-gray-500 text-sm">Loading stores...</Text>
            </View>
          ) : (
            <Text className="text-gray-800 font-semibold text-base">
              {stores?.length || 0}
            </Text>
          ),
          icon: <MaterialIcons name="store" size={22} color="#4B5563" />,
          description: 'Number of stores managed',
        }
      : null

  // Create final info list with stores info inserted after email
  const infoList = [
    baseInfoList[0], // Email
    ...(storesInfo ? [storesInfo] : []), // Stores (only for sellers)
    ...baseInfoList.slice(1), // Rest of the items
  ]

  return (
    <SafeAreaView>
      {infoList.map((item, index) => (
        <View
          key={index}
          className={`p-4 ${
            index !== infoList.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <View className="flex-row items-start gap-3">
            <View className="bg-white/80 backdrop-blur-sm p-2.5 rounded-xl shadow-sm">
              {item.icon}
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-gray-600 font-medium text-base">
                  {item.label}
                </Text>
                {item.value}
              </View>
              <Text className="text-gray-400 text-sm">{item.description}</Text>
            </View>
          </View>
        </View>
      ))}
    </SafeAreaView>
  )
}

export default UserDetailsFormContents
