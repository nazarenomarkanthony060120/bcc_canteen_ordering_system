import React from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type TimeFilter = 'day' | 'week' | 'month'

interface TimeRangeIndicatorProps {
  timeFilter: TimeFilter
}

const TimeRangeIndicator = ({ timeFilter }: TimeRangeIndicatorProps) => (
  <View className="flex-row justify-between items-center px-2">
    <View className="flex-row items-center space-x-2">
      <View className="w-2 h-2 rounded-full bg-emerald-500" />
      <Text className="text-gray-500 text-xs font-medium">
        {timeFilter === 'day' 
          ? 'Hourly breakdown'
          : timeFilter === 'week'
          ? 'Daily breakdown'
          : 'Monthly breakdown'
        }
      </Text>
    </View>
    <LinearGradient
      colors={['rgba(5, 150, 105, 0.1)', 'rgba(5, 150, 105, 0.05)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="px-3 py-1 rounded-full"
    >
      <Text className="text-emerald-600 text-xs font-medium">Sales Trend</Text>
    </LinearGradient>
  </View>
)

export default TimeRangeIndicator 