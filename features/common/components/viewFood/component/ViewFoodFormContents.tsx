import { View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Food } from '@/utils/types'
import Typo from '@/components/common/typo'
import { BlurView } from 'expo-blur'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

interface ViewFoodFormContentsProps {
  food: Food | null | undefined
}

const ViewFoodFormContents = ({ food }: ViewFoodFormContentsProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View className="p-6">
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-emerald-50 p-2 rounded-full">
              <Ionicons name="information-circle" size={20} color="#10B981" />
            </View>
            <Typo className="text-gray-700 text-lg font-semibold">
              Description
            </Typo>
          </View>
          <Typo className="text-gray-600 text-base leading-6">
            {food?.description}
          </Typo>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-blue-50 p-2 rounded-full">
              <MaterialIcons name="category" size={20} color="#3B82F6" />
            </View>
            <Typo className="text-gray-700 text-lg font-semibold">
              Category
            </Typo>
          </View>
          <View className="bg-blue-50 px-4 py-2 rounded-xl">
            <Typo className="text-blue-600 text-base">
              {food?.type || 'Uncategorized'}
            </Typo>
          </View>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-purple-50 p-2 rounded-full">
              <MaterialIcons name="inventory" size={20} color="#8B5CF6" />
            </View>
            <Typo className="text-gray-700 text-lg font-semibold">
              Availability
            </Typo>
          </View>
          <View className="bg-purple-50 px-4 py-2 rounded-xl">
            <Typo className="text-purple-600 text-base">
              {food?.quantity} items available
            </Typo>
          </View>
        </View>

        <View>
          <View className="flex-row items-center gap-2 mb-3">
            <View className="bg-amber-50 p-2 rounded-full">
              <MaterialIcons name="star" size={20} color="#F59E0B" />
            </View>
            <Typo className="text-gray-700 text-lg font-semibold">
              Popularity
            </Typo>
          </View>
          <View className="bg-amber-50 px-4 py-2 rounded-xl">
            <Typo className="text-amber-600 text-base">
              {food?.popularity || 0} people liked this food
            </Typo>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}

export default ViewFoodFormContents
