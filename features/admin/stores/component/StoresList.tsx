import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Store, StoreStatus } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { getStoreStatus } from '@/features/common/parts/getStoreStatus'
import { getStoreStatusColor } from '@/features/common/parts/getStoreStatusColor'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { Timestamp } from 'firebase/firestore'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

interface StoresListProps {
  store: Store
}

const StoresList = ({ store }: StoresListProps) => {
  const { data: storeOwner, isLoading } = useGetUserByUserId({
    id: store.userId,
  })
  const router = useRouter()

  const navigateToViewStore = () => {
    router.push(`/screens/common/viewStore?storeId=${store.id}`)
  }

  const statusColor = getStoreStatusColor(store.status)
  const isApplied = store.status === StoreStatus.APPLIED
  const backgroundColor = isApplied ? '#E0F2FE' : statusColor.color + '15'
  const textColor = isApplied ? '#0284C7' : statusColor.color

  return (
    <Pressable 
      onPress={navigateToViewStore}
      className="mb-4 overflow-hidden rounded-2xl"
    >
      <LinearGradient
        colors={['#ffffff', '#f8fafc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3
        }}
      >
        <View className="flex-row gap-4">
          <View className="relative">
            <View className="relative">
              <ImageWrapper
                source={CANTEEN_IMAGE}
                className="rounded-xl"
                style={{ height: 120, width: 120 }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.2)']}
                className="absolute bottom-0 left-0 right-0 h-12 rounded-b-xl"
              />
            </View>
          </View>

          <View className="flex-1 justify-between">
            <View>
              <Text className="text-gray-800 font-bold text-lg mb-2">
                {store.store}
              </Text>
              <View className="flex-row items-center mb-3">
                <View 
                  className="px-3 py-1.5 rounded-full"
                  style={{ backgroundColor }}
                >
                  <View className="flex-row items-center gap-1.5">
                    <View 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: textColor }}
                    />
                    <Text 
                      className="text-xs font-medium"
                      style={{ color: textColor }}
                    >
                      {getStoreStatus(store.status)}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-row items-center gap-1.5 mb-2">
                <MaterialIcons name="location-on" size={16} color="#4B5563" />
                <Text className="text-gray-600 text-sm flex-1" numberOfLines={1}>
                  {store.address}
                </Text>
              </View>
            </View>

            <View className="border-t border-gray-100 pt-2.5 mt-2.5">
              <View className="flex-row items-center gap-2">
                <View className="bg-gray-100 p-1.5 rounded-full">
                  <MaterialIcons name="person" size={14} color="#4B5563" />
                </View>
                <Text className="text-gray-700 text-sm font-medium">
                  {storeOwner?.name || 'Loading...'}
                </Text>
              </View>
              <View className="flex-row items-center gap-2 mt-2">
                <View className="bg-gray-100 p-1.5 rounded-full">
                  <MaterialIcons name="access-time" size={14} color="#4B5563" />
                </View>
                <Text className="text-gray-500 text-xs">
                  Created: {createdAtFormatted(store.createdAt as unknown as Timestamp)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  )
}

export default StoresList
