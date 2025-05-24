import { View, Text, TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import { Store, StoreStatus, StoreStatusText, User } from '@/utils/types'
import { Timestamp } from 'firebase/firestore'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { getStoreStatusColor } from '@/features/common/parts/getStoreStatusColor'

interface StoreFormContentsProps {
  store: Store
  user: User | null | undefined
}

const StoreFormContents = ({ store, user }: StoreFormContentsProps) => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const status = getStoreStatusColor(store.status)

  const navigateToMyStore = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push(`/screens/(seller)/my-store/myStore?storeId=${store.id}`)
    })
  }

  return (
    <TouchableOpacity onPress={navigateToMyStore} activeOpacity={0.9}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          elevation: 8,
        }}
        className="mb-4"
      >
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-2xl overflow-hidden"
        >
          <LinearGradient
            colors={['#ffffff', '#f8fafc'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-1"
          >
            <View className="bg-white rounded-xl overflow-hidden">
              <View className="p-5">
                <View className="flex-row items-start gap-5">
                  <View className="relative">
                    <View className="overflow-hidden rounded-xl">
                      <ImageWrapper
                        source={
                          store.image
                            ? { uri: `data:image/jpeg;base64,${store.image}` }
                            : CANTEEN_IMAGE
                        }
                        style={{ height: 90, width: 110 }}
                      />
                    </View>
                  </View>
                  <View className="flex-1">
                    <View>
                      <Text className="text-gray-800 text-xl font-bold mb-2">
                        {store.store}
                      </Text>
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
                      <View className="flex-row items-center">
                        <MaterialIcons name="event" size={16} color="#6B7280" />
                        <Text className="text-gray-500 ml-1.5 text-sm">
                          {createdAtFormatted(store.createdAt as Timestamp)}
                        </Text>
                      </View>
                    </View>
                    <View className="mt-3">
                      <View className="flex-row items-center">
                        <View className="bg-gray-50 p-1.5 rounded-full">
                          <MaterialIcons
                            name="person"
                            size={14}
                            color="#4B5563"
                          />
                        </View>
                        <Text className="text-gray-500 ml-1.5 text-xs">
                          {user?.name || 'Loading...'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default StoreFormContents
