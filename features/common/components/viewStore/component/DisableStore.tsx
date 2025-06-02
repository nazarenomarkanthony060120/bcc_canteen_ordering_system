import { Alert, TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import { useDisableStore } from '@/hooks/useMutation/admin/useDisableStore'
import { StoreHealth, StoreStatus } from '@/utils/types'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

interface DisableStoreProps {
  status: StoreHealth
  storeId: string | undefined
}

const DisableStore = ({ status, storeId }: DisableStoreProps) => {
  const { mutate: disableStore, isPending } = useDisableStore()
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

    disableStore(
      { id: storeId },
      {
        onError: () => {
          Alert.alert('Error in updating the status', 'Please try again')
        },
      },
    )
  }

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}
    >
      <TouchableOpacity
        onPress={handleUpdateStatus}
        disabled={isPending}
        className={`flex-row items-center justify-center gap-2 px-5 py-3.5 rounded-xl overflow-hidden ${isPending ? 'opacity-50' : ''} bg-red-50 border border-red-200`}
        style={{
          shadowColor: '#EF4444',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <LinearGradient
          colors={['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.05)']}
          className="absolute inset-0"
        />
        <MaterialIcons name={'block'} size={22} color={'#EF4444'} />
        <Typo className={`text-red-500 font-semibold text-base`}>
          {isPending ? 'Updating...' : 'Deactivate Store'}
        </Typo>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default DisableStore
