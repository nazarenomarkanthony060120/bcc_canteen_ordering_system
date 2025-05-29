import React from 'react'
import { View, Text } from 'react-native'
import { ReservationStatus } from '@/utils/types/reservation'
import { getReservationStatusConfig } from '@/utils/constants/reservation'

interface StatusBadgeProps {
  status: ReservationStatus
  size?: 'sm' | 'md' | 'lg'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const config = getReservationStatusConfig(status)
  const { label, color } = config

  const sizeConfig = {
    sm: {
      container: 'px-2 py-0.5',
      text: 'text-xs',
      dot: 'w-1.5 h-1.5',
    },
    md: {
      container: 'px-2.5 py-1',
      text: 'text-sm',
      dot: 'w-2 h-2',
    },
    lg: {
      container: 'px-3 py-1.5',
      text: 'text-base',
      dot: 'w-2.5 h-2.5',
    },
  }

  const currentSize = sizeConfig[size]

  return (
    <View
      className={`flex-row items-center rounded-lg ${color.container} ${currentSize.container}`}
    >
      <View className={`rounded-full mr-2 ${color.dot} ${currentSize.dot}`} />
      <Text className={`font-medium ${color.text} ${currentSize.text}`}>
        {label}
      </Text>
    </View>
  )
}
