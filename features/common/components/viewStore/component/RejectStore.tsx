import { TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import { StoreStatus } from '@/utils/types'
import { useApproveStore } from '@/hooks/useMutation/admin/useApproveStore'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { getStoreStatus } from '@/features/common/parts/getStoreStatus'

interface RejectStoreProps {
  status: StoreStatus
  storeId: string | undefined
}

const RejectStore = ({ status, storeId }: RejectStoreProps) => {
  const { mutate: approveStore, isPending } = useApproveStore()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const opacityAnim = useRef(new Animated.Value(1)).current

  const handleUpdateStatus = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start()

    approveStore({ id: storeId })
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handleUpdateStatus}
        disabled={isPending}
        className={`flex-row items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-50 border border-red-200 ${
          isPending ? 'opacity-50' : ''
        }`}
        style={{
          shadowColor: '#EF4444',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <MaterialIcons name="cancel" size={20} color="#EF4444" />
        <Typo className="text-red-500 font-semibold text-base">
          {isPending ? 'Updating...' : 'Reject Store'}
        </Typo>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default RejectStore
