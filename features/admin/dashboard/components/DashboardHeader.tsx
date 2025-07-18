import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface DashboardHeaderProps {
  totalSellers: number
  activeSellers: number
  appliedSellers: number
  disabledSellers: number
}

const FromDashboardHeader: React.FC<DashboardHeaderProps> = ({
  totalSellers,
  activeSellers,
  appliedSellers,
  disabledSellers,
}) => {
  return (
    <View className="mb-6 bg-black/70 rounded-3xl p-4">
      <View className="flex-row items-center gap-3 mb-2">
        <MaterialIcons name="dashboard" size={28} color="#ffffff" />
        <Text className="text-2xl font-bold text-white">Admin Dashboard</Text>
      </View>
      <Text className="text-white/80 text-base mb-4">
        Complete seller information and management overview
      </Text>

      <View className="flex-col gap-3">
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white/10 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="people" size={20} color="#ffffff" />
              <Text className="text-white/80 text-sm font-medium">
                Total Sellers
              </Text>
            </View>
            <Text className="text-white text-2xl font-bold">
              {totalSellers}
            </Text>
          </View>

          <View className="flex-1 bg-white/10 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="check-circle" size={20} color="#10B981" />
              <Text className="text-white/80 text-sm font-medium">
                Approved
              </Text>
            </View>
            <Text className="text-emerald-400 text-2xl font-bold">
              {activeSellers}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white/10 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="schedule" size={20} color="#60a5fa" />
              <Text className="text-white/80 text-sm font-medium">Applied</Text>
            </View>
            <Text className="text-blue-400 text-2xl font-bold">
              {appliedSellers}
            </Text>
          </View>

          <View className="flex-1 bg-white/10 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="block" size={20} color="#EF4444" />
              <Text className="text-white/80 text-sm font-medium">
                Disabled
              </Text>
            </View>
            <Text className="text-red-400 text-2xl font-bold">
              {disabledSellers}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default FromDashboardHeader
