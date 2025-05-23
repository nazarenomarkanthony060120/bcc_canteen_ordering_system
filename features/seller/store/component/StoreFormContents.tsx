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

interface StoreFormContentsProps {
  store: Store
  user: User | null | undefined
}

const getStoreStatus = (status: number) => {
  switch (status) {
    case StoreStatus.APPLIED:
      return {
        text: StoreStatusText.APPLIED,
        color: '#3B82F6',
        bgColor: '#EFF6FF',
        icon: 'hourglass-empty' as const,
        gradient: [
          'rgba(59, 130, 246, 0.1)',
          'rgba(96, 165, 250, 0.1)',
        ] as const,
        textColor: '#3B82F6',
        borderColor: 'rgba(59, 130, 246, 0.3)',
      }
    case StoreStatus.PENDING:
      return {
        text: StoreStatusText.PENDING,
        color: '#F59E0B',
        bgColor: '#FFFBEB',
        icon: 'schedule' as const,
        gradient: [
          'rgba(245, 158, 11, 0.1)',
          'rgba(251, 191, 36, 0.1)',
        ] as const,
        textColor: '#F59E0B',
        borderColor: 'rgba(245, 158, 11, 0.3)',
      }
    case StoreStatus.APPROVED:
      return {
        text: StoreStatusText.APPROVED,
        color: '#10B981',
        bgColor: '#ECFDF5',
        icon: 'check-circle' as const,
        gradient: [
          'rgba(16, 185, 129, 0.1)',
          'rgba(52, 211, 153, 0.1)',
        ] as const,
        textColor: '#10B981',
        borderColor: 'rgba(16, 185, 129, 0.3)',
      }
    case StoreStatus.REJECTED:
      return {
        text: StoreStatusText.REJECTED,
        color: '#EF4444',
        bgColor: '#FEF2F2',
        icon: 'cancel' as const,
        gradient: [
          'rgba(239, 68, 68, 0.1)',
          'rgba(248, 113, 113, 0.1)',
        ] as const,
        textColor: '#EF4444',
        borderColor: 'rgba(239, 68, 68, 0.3)',
      }
    default:
      return {
        text: StoreStatusText.UNKWON,
        color: '#6B7280',
        bgColor: '#F3F4F6',
        icon: 'help' as const,
        gradient: [
          'rgba(107, 114, 128, 0.1)',
          'rgba(156, 163, 175, 0.1)',
        ] as const,
        textColor: '#6B7280',
        borderColor: 'rgba(107, 114, 128, 0.3)',
      }
  }
}

const StoreFormContents = ({ store, user }: StoreFormContentsProps) => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const status = getStoreStatus(store.status)

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
                        source={CANTEEN_IMAGE}
                        style={{ height: 90, width: 110 }}
                      />
                    </View>
                  </View>
                  <View className="flex-1 gap-3">
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
                    <View className="flex-row items-center gap-4">
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
