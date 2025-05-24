import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

const AddFoodFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center py-6">
      <BlurView intensity={20} className="rounded-2xl overflow-hidden w-full">
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.05)']}
          className="p-6"
        >
          <View className="flex-row items-center justify-center gap-3">
            <View className="bg-emerald-100 p-3 rounded-full">
              <MaterialIcons name="restaurant" size={28} color="#059669" />
            </View>
            <View>
              <Typo className="text-emerald-700 text-2xl font-bold text-center">
                Create Your Food
              </Typo>
              <Typo className="text-emerald-600 text-sm text-center mt-1">
                Add a new item to your store menu
              </Typo>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </SafeAreaView>
  )
}

export default AddFoodFormHeader
