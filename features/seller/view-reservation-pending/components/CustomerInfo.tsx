import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { User } from '@/utils/types'

interface CustomerInfoProps {
  user: User
}

const CustomerInfo = ({ user }: CustomerInfoProps) => {
  return (
    <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center mb-4">
          <View className="bg-emerald-50 p-3 rounded-full mr-3">
            <MaterialIcons name="person" size={24} color="#10B981" />
          </View>
          <Typo className="text-gray-800 font-semibold text-lg">
            Customer Information
          </Typo>
        </View>
        <View className="bg-gray-50 rounded-2xl p-4">
          <View className="flex-row justify-between mb-3">
            <Typo className="text-gray-600">Name</Typo>
            <Typo className="text-gray-800 font-semibold">{user.name}</Typo>
          </View>
          <View className="flex-row justify-between">
            <Typo className="text-gray-600">Type</Typo>
            <Typo className="text-gray-800 font-semibold">{user.type}</Typo>
          </View>
        </View>
      </View>
    </BlurView>
  )
}

export default CustomerInfo
