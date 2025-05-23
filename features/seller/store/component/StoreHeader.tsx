import React from 'react'
import { View, Animated } from 'react-native'
import Typo from '@/components/common/typo'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

const StoreHeader = () => {
  return (
    <View className="mb-6">
      <BlurView
        intensity={20}
        tint="light"
        className="rounded-2xl overflow-hidden"
      >
        <LinearGradient
          colors={['#10B981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-6 rounded-2xl"
        >
          <View className="flex-row items-center gap-3">
            <View className="bg-white/20 p-2 rounded-xl">
              <MaterialIcons name="store" size={24} color="white" />
            </View>
            <View>
              <Typo className="text-white/90 text-sm font-medium mb-1">
                Welcome to
              </Typo>
              <Typo className="text-white text-2xl font-bold">My Store</Typo>
            </View>
          </View>
          <View className="mt-4 flex-row items-center gap-2">
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Typo className="text-white text-xs font-medium">
                Manage your stores
              </Typo>
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Typo className="text-white text-xs font-medium">
                Track performance
              </Typo>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  )
}

export default StoreHeader
