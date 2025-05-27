import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface StatsCardProps {
  icon: string
  count: number
  label: string
  iconColor: string
  countColor: string
  bgColor: string
}

const StatsCard = ({
  icon,
  count,
  label,
  iconColor,
  countColor,
  bgColor,
}: StatsCardProps) => {
  return (
    <BlurView intensity={20} className="flex-1 rounded-2xl overflow-hidden">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className={`${bgColor} p-2 rounded-full`}>
            <MaterialIcons name={icon as any} size={20} color={iconColor} />
          </View>
          <Typo className={`${countColor} font-semibold`}>{count}</Typo>
        </View>
        <Typo className="text-gray-600 text-sm">{label}</Typo>
      </View>
    </BlurView>
  )
}

export default StatsCard
