import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const EmptyState: React.FC = () => {
  return (
    <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 items-center border border-white/30">
      <View className="bg-gray-100 p-6 rounded-full mb-4">
        <MaterialIcons name="people-outline" size={48} color="#9CA3AF" />
      </View>

      <Text className="text-gray-700 text-xl font-semibold mb-2">
        No Sellers Found
      </Text>

      <Text className="text-gray-500 text-center text-base leading-relaxed">
        There are currently no sellers registered in the system. New sellers
        will appear here once they register and get approved.
      </Text>

      <View className="mt-6 flex-row items-center bg-blue-50 px-4 py-2 rounded-full">
        <MaterialIcons name="info" size={16} color="#3B82F6" />
        <Text className="text-blue-600 text-sm ml-2">Pull down to refresh</Text>
      </View>
    </View>
  )
}

export default EmptyState
