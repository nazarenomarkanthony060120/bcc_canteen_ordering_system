import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { getReservationStatus } from '@/features/common/parts/getReservationStatus'
import { getReservationStatusColor } from '@/features/common/parts/getReservationStatusColor'
import { getReservationStatusIcon } from '@/features/common/parts/getReservationStatusIcon'

interface OrderStatusProps {
  status: number
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View
              className="p-3 rounded-full mr-3"
              style={{
                backgroundColor: `${getReservationStatusColor(status)}20`,
              }}
            >
              <MaterialIcons
                name={getReservationStatusIcon(status)}
                size={24}
                color={getReservationStatusColor(status)}
              />
            </View>
            <View>
              <Typo className="text-gray-500 text-sm">Order Status</Typo>
              <Typo
                className="font-semibold"
                style={{
                  color: getReservationStatusColor(status),
                }}
              >
                {getReservationStatus(status)}
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </BlurView>
  )
}

export default OrderStatus
