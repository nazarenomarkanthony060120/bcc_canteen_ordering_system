import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Food, Store } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import ViewStoreFood from './ViewStoreFood'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { getStoreStatus } from '@/features/common/parts/getStoreStatus'
import { getStoreStatusColor } from '@/features/common/parts/getStoreStatusColor'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'
import ViewStoreActionStatus from './ViewStoreActionStatus'

interface ViewStoreFormCardProps {
  foods: Food[] | null | undefined
  store: Store | null | undefined
}

const ViewStoreFormCard = ({ foods, store }: ViewStoreFormCardProps) => {
  const statusColor = getStoreStatusColor(store?.status || 0)
  const isApplied = store?.status === 0
  const backgroundColor = isApplied ? '#E0F2FE' : statusColor.color + '15'
  const textColor = isApplied ? '#0284C7' : statusColor.color

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <View className="gap-6 mb-6">
        <View className="items-center">
          <View className="relative">
            <ImageWrapper
              source={CANTEEN_IMAGE}
              className="rounded-2xl"
              style={{ height: 180, width: 180 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.2)']}
              className="absolute bottom-0 left-0 right-0 h-12 rounded-b-2xl"
            />
          </View>
        </View>

        <View className="gap-4">
          <View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              {store?.store}
            </Text>
            <View className="flex-row items-center gap-2">
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
                    {getStoreStatus(store?.status || 0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="bg-gray-100 p-2 rounded-full">
                <MaterialIcons name="location-on" size={20} color="#4B5563" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-0.5">Address</Text>
                <Text className="text-gray-800 font-medium">
                  {store?.address}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-2">
              <View className="bg-gray-100 p-2 rounded-full">
                <MaterialIcons name="access-time" size={20} color="#4B5563" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-0.5">Created</Text>
                <Text className="text-gray-800 font-medium">
                  {createdAtFormatted(store?.createdAt as unknown as Timestamp)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <ViewStoreActionStatus storeId={store?.id} status={store?.status} />
      </View>
      <View className="mb-6">
        <ViewStoreFood foods={foods} />
      </View>
    </ScrollView>
  )
}

export default ViewStoreFormCard
