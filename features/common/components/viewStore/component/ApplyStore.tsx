import { TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import { getStoreStatus } from '@/features/common/parts/getStoreStatus'
import Typo from '@/components/common/typo'
import { StoreStatus } from '@/utils/types'
import { MaterialIcons } from '@expo/vector-icons'
import { useApplyStore } from '@/hooks/useMutation/admin/useApplyStore'

interface ApproveStoreProps {
  status: StoreStatus
  storeId: string | undefined
}

const ApplyStore = ({ status, storeId }: ApproveStoreProps) => {
  const { mutate: applyStore, isPending } = useApplyStore()
  const scaleAnim = useRef(new Animated.Value(1)).current

  const isActive = getStoreStatus(Number(status)) === 'Approved'

  const handleUpdateStatus = () => {
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
    ]).start()

    applyStore({ id: storeId })
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handleUpdateStatus}
        disabled={isPending}
        className={`flex-row items-center justify-center gap-2 px-5 py-3 rounded-xl ${
          isActive
            ? 'bg-red-50 border border-red-200'
            : 'bg-green-50 border border-green-200'
        } ${isPending ? 'opacity-50' : ''}`}
        style={{
          shadowColor: isActive ? '#EF4444' : '#22C55E',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <MaterialIcons
          name={isActive ? 'block' : 'check-circle'}
          size={20}
          color={isActive ? '#EF4444' : '#22C55E'}
        />
        <Typo
          className={`${
            isActive ? 'text-red-500' : 'text-green-500'
          } font-semibold text-base`}
        >
          {isPending
            ? 'Updating...'
            : isActive
              ? 'Deactivate Store'
              : 'Activate Store'}
        </Typo>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default ApplyStore
