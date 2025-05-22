import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list'
import { Food } from '@/utils/types'
import ViewStoreFoodLists from './ViewStoreFoodLists'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

interface ViewStoreFoodProps {
  foods: Food[] | null | undefined
}

const ViewStoreFood = ({ foods }: ViewStoreFoodProps) => {
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

  if (!foods || foods.length === 0) {
    return (
      <Animated.View
        className="flex-1 items-center justify-center p-8"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 items-center shadow-lg border border-white/30">
          <View className="bg-gray-50 p-4 rounded-full mb-4">
            <MaterialIcons name="restaurant" size={48} color="#9CA3AF" />
          </View>
          <Typo className="text-gray-700 text-xl font-semibold mb-2">
            No Food Items Yet
          </Typo>
          <Typo className="text-gray-500 text-base text-center">
            This store hasn't added any food items yet.
          </Typo>
        </View>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      className="flex-1"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View className="flex-row items-center gap-2 mb-4">
        <View className="bg-blue-50 p-2 rounded-full">
          <MaterialIcons name="restaurant" size={20} color="#3B82F6" />
        </View>
        <Typo className="text-gray-700 font-semibold text-base">Food Menu</Typo>
      </View>

      <View className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30">
        <MasonryFlashList
          data={foods}
          estimatedItemSize={136}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Food }) => (
            <ViewStoreFoodLists food={item} />
          )}
          keyExtractor={(item: Food) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          ListHeaderComponent={
            <LinearGradient
              colors={['rgba(59, 130, 246, 0.05)', 'rgba(59, 130, 246, 0.02)']}
              className="absolute inset-0 rounded-3xl"
            />
          }
        />
      </View>
    </Animated.View>
  )
}

export default ViewStoreFood
