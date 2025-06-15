import { View, Text, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Food, Store, UserType } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import ViewStoreFood from './ViewStoreFood'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
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
  const { data: user } = useGetUserByUserId({ id: auth.user?.uid })

  const fadeAnim = useRef(new Animated.Value(0)).current
  const status = getStoreStatusColor(store?.status || 0)

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
            <View className="overflow-hidden rounded-xl">
              <ImageWrapper
                source={
                  store?.image
                    ? { uri: `data:image/jpeg;base64,${store.image}` }
                    : CANTEEN_IMAGE
                }
                style={{ height: 200, width: 300 }}
              />
            </View>
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
                style={{
                  borderWidth: 1,
                  borderColor: status.borderColor,
                  borderRadius: 12,
                  backgroundColor: status.bgColor,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  alignSelf: 'flex-start',
                  marginBottom: 12,
                }}
              >
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={status.icon}
                    size={14}
                    color={status.textColor}
                  />
                  <Text
                    className="ml-1 text-[10px] font-bold"
                    style={{ color: status.textColor }}
                  >
                    {status.text}
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
