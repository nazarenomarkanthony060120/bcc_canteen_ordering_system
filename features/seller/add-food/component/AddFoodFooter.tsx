import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

const AddFoodFooter = () => {
  return (
    <SafeAreaView className="mb-10">
      <BlurView intensity={20} className="rounded-2xl overflow-hidden">
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.05)']}
          className="p-6"
        >
          <View className="flex-row items-center gap-3">
            <View className="bg-emerald-100 p-3 rounded-full">
              <MaterialIcons name="restaurant-menu" size={24} color="#059669" />
            </View>
            <View className="flex-1">
              <Typo className="text-emerald-700 text-lg font-bold">
                Craft Your Culinary Masterpiece
              </Typo>
              <Typo className="text-emerald-600 text-sm mt-1">
                Create an irresistible menu that keeps customers coming back
              </Typo>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </SafeAreaView>
  )
}

export default AddFoodFooter
