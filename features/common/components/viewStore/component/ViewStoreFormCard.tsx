import { View, Text, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Food, Store, UserType } from '@/utils/types'
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
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'

interface ViewStoreFormCardProps {
  foods: Food[] | null | undefined
  store: Store | null | undefined
}

const ViewStoreFormCard = ({ foods, store }: ViewStoreFormCardProps) => {
  const auth = useAuth()
  const { data: user } = useGetUserByUserId({id: auth.user?.uid})

  const fadeAnim = useRef(new Animated.Value(0)).current
  const statusColor = getStoreStatusColor(store?.status || 0)
  const isApplied = store?.status === 0
  const backgroundColor = isApplied ? '#E0F2FE' : statusColor.color + '15'
  const textColor = isApplied ? '#0284C7' : statusColor.color

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <ScrollView
      className="flex-1 px-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Animated.View className="gap-6 mb-6" style={{ opacity: fadeAnim }}>
        <View className="items-center">
          <View className="relative">
            <ImageWrapper
              source={CANTEEN_IMAGE}
              className="rounded-3xl"
              style={{
                height: 200,
                width: 200,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
              }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              className="absolute bottom-0 left-0 right-0 h-16 rounded-b-3xl"
            />
          </View>
        </View>

        <View className="gap-5">
          <View>
            <Text className="text-3xl font-bold text-gray-800 mb-3">
              {store?.store}
            </Text>
            <View className="flex-row items-center gap-2">
              <View
                className="px-4 py-2.5 rounded-full"
                style={{
                  backgroundColor,
                  shadowColor: textColor,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View className="flex-row items-center gap-2.5">
                  <View
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: textColor }}
                  />
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: textColor }}
                  >
                    {getStoreStatus(store?.status || 0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            className="bg-white rounded-3xl p-5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center gap-3 mb-4">
              <View
                className="bg-gray-50 p-2.5 rounded-full"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <MaterialIcons name="location-on" size={22} color="#4B5563" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1 font-medium">
                  Address
                </Text>
                <Text className="text-gray-800 font-semibold text-base">
                  {store?.address}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <View
                className="bg-gray-50 p-2.5 rounded-full"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <MaterialIcons name="access-time" size={22} color="#4B5563" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm mb-1 font-medium">
                  Created
                </Text>
                <Text className="text-gray-800 font-semibold text-base">
                  {createdAtFormatted(store?.createdAt as unknown as Timestamp)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {user?.type === UserType.ADMIN && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <ViewStoreActionStatus storeId={store?.id} status={store?.status} />
        </Animated.View>
      )}

      <Animated.View className="mb-6" style={{ opacity: fadeAnim }}>
        <ViewStoreFood foods={foods} />
      </Animated.View>
    </ScrollView>
  )
}

export default ViewStoreFormCard
