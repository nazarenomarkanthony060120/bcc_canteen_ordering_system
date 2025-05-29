import React, { useRef } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'
import { TouchableOpacity, View, Animated, Text } from 'react-native'
import { BlurView } from 'expo-blur'
import { usePendingStore } from '@/hooks/useMutation/seller/my-store/usePendingStore'
import { StoreStatus } from '@/utils/types'
import { getStoreStatusColor } from '@/features/common/parts/getStoreStatusColor'

interface MyStoreHeaderProps {
  storeId: string | undefined
  status: StoreStatus | undefined
}

const MyStoreHeader = ({ storeId, status }: MyStoreHeaderProps) => {
  const { mutate: pendingStore } = usePendingStore()
  const router = useRouter()
  const applyStatus = getStoreStatusColor(status || 0)
  const isApplied = status === StoreStatus.APPLIED
  const backScaleAnim = useRef(new Animated.Value(1)).current
  const applyScaleAnim = useRef(new Animated.Value(1)).current

  const navigateToStore = () => {
    router.push('/screens/(seller)/dashboard/store')
  }

  const handleBackPress = () => {
    Animated.sequence([
      Animated.timing(backScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(backScaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigateToStore()
    })
  }

  const handlePendingStore = () => {
    Animated.sequence([
      Animated.timing(applyScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(applyScaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      pendingStore({
        id: storeId,
      })
    })
  }

  return (
    <View className="w-full flex-row items-center justify-between mb-4 px-1">
      <Animated.View
        style={{
          transform: [{ scale: backScaleAnim }],
        }}
      >
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-full overflow-hidden"
        >
          <TouchableOpacity
            onPress={handleBackPress}
            className="flex-row items-center gap-2 bg-white/90 p-3 rounded-full"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}
          >
            <View className="bg-emerald-50 p-1.5 rounded-full">
              <MaterialIcons name="arrow-back" size={20} color="#10B981" />
            </View>
            <Typo className="text-emerald-600 font-semibold">Back</Typo>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>

      {(isApplied || status === StoreStatus.PENDING) && (
        <Animated.View
          style={{
            transform: [{ scale: applyScaleAnim }],
          }}
        >
          <BlurView
            intensity={20}
            tint="light"
            className="rounded-full overflow-hidden"
          >
            <TouchableOpacity
              onPress={handlePendingStore}
              disabled={!isApplied}
              className={`flex-row items-center gap-3 ${isApplied ? '' : `${applyStatus.bgColor} ${applyStatus.borderColor} ${applyStatus.color}`} rounded-full`}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: applyStatus.borderColor,
                  borderRadius: 16,
                  backgroundColor: applyStatus.bgColor,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  alignSelf: 'center',
                }}
              >
                <View className="flex-row items-center gap-3">
                  <MaterialIcons
                    name={applyStatus.icon}
                    size={20}
                    color={applyStatus.textColor}
                  />
                  <Text
                    className="text-base font-bold"
                    style={{ color: applyStatus.textColor }}
                  >
                    {isApplied ? 'Apply for Approval' : 'Pending Application'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </BlurView>
        </Animated.View>
      )}
    </View>
  )
}

export default MyStoreHeader
