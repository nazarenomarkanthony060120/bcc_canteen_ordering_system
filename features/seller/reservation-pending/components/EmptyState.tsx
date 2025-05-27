import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

const EmptyState = () => {
  return (
    <BlurView intensity={20} className="rounded-3xl overflow-hidden">
      <View className="bg-white/90 p-8 items-center">
        <View className="bg-gray-100 p-6 rounded-full mb-4">
          <MaterialIcons name="receipt" size={40} color="#6B7280" />
        </View>
        <Typo className="text-gray-800 text-xl font-semibold mb-2">
          No Pending Orders
        </Typo>
        <Typo className="text-gray-500 text-center">
          All orders have been processed
        </Typo>
      </View>
    </BlurView>
  )
}

export default EmptyState
