import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { StoreStatus } from '@/utils/types'
import ApproveStore from './ApproveStore'
import RejectStore from './RejectStore'
import { MaterialIcons } from '@expo/vector-icons'

interface ApproveRejectStoreProps {
  status: StoreStatus
  storeId: string | undefined
}

const ApproveRejectStore = ({ status, storeId }: ApproveRejectStoreProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <Animated.View
      className="flex-row gap-3"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View className="flex-1">
        <ApproveStore status={status} storeId={storeId} />
      </View>
      <View className="flex-1">
        <RejectStore status={status} storeId={storeId} />
      </View>
    </Animated.View>
  )
}

export default ApproveRejectStore
