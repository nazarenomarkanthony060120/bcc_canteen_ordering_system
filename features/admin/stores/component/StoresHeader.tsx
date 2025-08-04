import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const StoresHeader = () => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center gap-3 mb-2">
        <MaterialIcons name="store" size={28} color="#000" />
        <Text className="text-2xl font-bold text-black">Store Management</Text>
      </View>
      <Text className="text-black/80 text-base">
        Review and manage all registered stores in the system
      </Text>
    </View>
  )
}

export default StoresHeader
