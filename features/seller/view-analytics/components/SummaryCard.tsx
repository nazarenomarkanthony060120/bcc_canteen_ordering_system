import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

type TimeFilter = 'day' | 'week' | 'month'

interface SummaryCardProps {
  title: string
  value: string | number
  trend?: number
  icon: string
  iconColor: string
  bgColor: string
  textColor: string
  subtitle?: string
  timeFilter?: TimeFilter
}

const SummaryCard = ({
  title,
  value,
  trend,
  icon,
  iconColor,
  bgColor,
  textColor,
  subtitle,
  timeFilter,
}: SummaryCardProps) => (
  <View className={`${trend ? 'mr-2' : 'ml-2'} flex-1`}>
    <LinearGradient
      colors={[bgColor, `${bgColor}99`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="p-4 rounded-2xl"
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className={`${textColor} text-sm font-medium opacity-80`}>
          {title}
        </Text>
        <View className="bg-white/20 p-2 rounded-full">
          <MaterialIcons name={icon as any} size={20} color={iconColor} />
        </View>
      </View>

      <Text className={`${textColor} text-2xl font-bold mb-2`}>
        {title === 'Orders' ? '' : '₱'}{' '}
        {typeof value === 'number' ? `${value.toFixed(2)}` : value}
      </Text>

      {trend !== undefined && (
        <View className="flex-row items-center bg-white/10 px-2 py-1 rounded-full self-start">
          <MaterialIcons
            name={trend >= 0 ? 'trending-up' : 'trending-down'}
            size={14}
            color={trend >= 0 ? '#059669' : '#ef4444'}
          />
          <Text
            className={`text-xs ml-1 font-medium ${
              trend >= 0 ? 'text-emerald-600' : 'text-red-500'
            }`}
          >
            {Math.abs(trend).toFixed(1)}% vs last {timeFilter}
          </Text>
        </View>
      )}

      {subtitle && (
        <View className="flex-row items-center mt-2 bg-white/10 px-2 py-1 rounded-full self-start">
          <MaterialIcons name="shopping-cart" size={14} color={iconColor} />
          <Text className={`${textColor} text-xs ml-1 font-medium opacity-80`}>
            {subtitle}
          </Text>
        </View>
      )}
    </LinearGradient>
  </View>
)

export default SummaryCard
