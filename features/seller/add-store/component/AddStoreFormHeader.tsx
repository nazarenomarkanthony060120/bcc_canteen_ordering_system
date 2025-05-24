import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import { View } from 'lucide-react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'

const AddStoreFormHeader = () => {
  return (
    <View className="mb-8">
        <BlurView intensity={20} tint="light" className="rounded-3xl overflow-hidden">
          <LinearGradient
            colors={['#10B981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6 rounded-3xl"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-white/20 p-3 rounded-xl">
                <MaterialIcons name="store" size={28} color="white" />
              </View>
              <View>
                <Typo className="text-white/90 text-base font-medium mb-1">
                  Welcome to
                </Typo>
                <Typo className="text-white text-2xl font-bold">
                  Create Your Store
                </Typo>
              </View>
            </View>
            <View className="mt-4 flex-row items-center gap-2">
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Typo className="text-white text-xs font-medium">
                  Easy Setup
                </Typo>
              </View>
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Typo className="text-white text-xs font-medium">
                  Quick Process
                </Typo>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
      </View>
  )
}

export default AddStoreFormHeader
