import React, { useRef } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'
import { TouchableOpacity, View, Animated } from 'react-native'
import { BlurView } from 'expo-blur'
import { StoreStatus } from '@/utils/types'
import ApplyForApproval from './ApplyForApproval'

interface MyStoreHeaderProps {
  storeId: string | undefined
  status: StoreStatus | undefined
}

const MyStoreHeader = ({ storeId, status }: MyStoreHeaderProps) => {
  const router = useRouter()
  const isApplied = status === StoreStatus.APPLIED
  const backScaleAnim = useRef(new Animated.Value(1)).current

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

  return (
    <View className="w-full flex-row items-center justify-between px-1">
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
        <ApplyForApproval
          isApplied={isApplied}
          storeId={storeId}
          status={status}
        />
      )}
    </View>
  )
}

export default MyStoreHeader
