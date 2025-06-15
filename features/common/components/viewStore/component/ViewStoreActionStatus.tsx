import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { StoreStatus } from '@/utils/types'
import DisableStore from './DisableStore'
import ApproveRejectStore from './ApproveRejectStore'
import ApproveStore from './ApproveStore'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import ApplyStore from './ApplyStore'

interface ViewStoreActionStatusProps {
  storeId: string | undefined
  status: StoreStatus | undefined
}

const ViewStoreActionStatus = ({
  storeId,
  status,
}: ViewStoreActionStatusProps) => {
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

  const renderActionButtons = () => {
    if (status === StoreStatus.APPROVED)
      return <DisableStore storeId={storeId} status={status} />
    if (status === StoreStatus.APPLIED)
      return <DisableStore storeId={storeId} status={status} />
    if (status === StoreStatus.PENDING)
      return <ApproveRejectStore storeId={storeId} status={status} />
    if (status === StoreStatus.REJECTED || status === StoreStatus.DISABLED)
      return <ApplyStore storeId={storeId} status={status} />
  }

  return (
    <Animated.View
      className="mb-6"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View className="flex-row items-center gap-2 mb-3">
        <View className="bg-blue-50 p-2 rounded-full">
          <MaterialIcons name="settings" size={20} color="#3B82F6" />
        </View>
        <Text className="text-gray-700 font-semibold text-base">
          Store Actions
        </Text>
      </View>
      <View
        className="bg-white rounded-2xl p-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.05)', 'rgba(59, 130, 246, 0.02)']}
          className="absolute inset-0 rounded-2xl"
        />
        {renderActionButtons()}
      </View>
    </Animated.View>
  )
}

export default ViewStoreActionStatus
