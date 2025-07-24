import React, { useRef } from 'react'
import { TouchableOpacity, View, Animated, Text } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import { usePendingStore } from '@/hooks/useMutation/seller/my-store/usePendingStore'
import { getStoreStatusColor } from '@/features/common/parts/getStoreStatusColor'

interface ApplyForApprovalProps {
  isApplied: boolean
  storeId: string | undefined
  status: number
}
const ApplyForApproval = ({
  isApplied,
  storeId,
  status,
}: ApplyForApprovalProps) => {
  const { mutate: pendingStore } = usePendingStore()
  const applyStatus = getStoreStatusColor(status || 0)

  const applyScaleAnim = useRef(new Animated.Value(1)).current

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
              borderRadius: 100,
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
  )
}

export default ApplyForApproval
