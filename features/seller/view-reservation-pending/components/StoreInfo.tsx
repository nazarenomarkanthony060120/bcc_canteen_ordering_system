import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { Store } from '@/utils/types'

interface StoreInfoProps {
  store: Store
}

const StoreInfo = ({ store }: StoreInfoProps) => {
  return (
    <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center mb-4">
          <View className="bg-blue-50 p-3 rounded-full mr-3">
            <MaterialIcons name="store" size={24} color="#3B82F6" />
          </View>
          <Typo className="text-gray-800 font-semibold text-lg">
            Store Information
          </Typo>
        </View>
        <View className="bg-gray-50 rounded-2xl p-4">
          <View className="flex-row justify-between mb-3">
            <Typo className="text-gray-600">Store Name</Typo>
            <Typo className="text-gray-800 font-semibold">{store.store}</Typo>
          </View>
          <View className="flex-row justify-between">
            <Typo className="text-gray-600">Address</Typo>
            <Typo className="text-gray-800 font-semibold">{store.address}</Typo>
          </View>
        </View>
      </View>
    </BlurView>
  )
}

export default StoreInfo
