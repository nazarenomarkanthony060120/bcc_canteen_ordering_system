import { View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import FoodList from './component/FoodList'
import Typo from '@/components/common/typo'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'

const PopularFood = () => {
  const { data: popularFood, isFetching } = useFetchAllPopularFoods()
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

  if (isFetching) return null
  if (!popularFood || popularFood.length === 0) {
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="items-center justify-center p-4"
      >
        <BlurView intensity={10} className="rounded-2xl overflow-hidden">
          <View className="bg-white/90 p-4 items-center">
            <View className="bg-gray-50 p-3 rounded-full mb-2">
              <MaterialIcons name="restaurant" size={24} color="#9CA3AF" />
            </View>
            <Typo className="text-gray-700 font-semibold mb-1">
              No Popular Foods
            </Typo>
            <Typo className="text-gray-500 text-sm text-center">
              Check back later for popular items
            </Typo>
          </View>
        </BlurView>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <BlurView intensity={10} className="rounded-2xl overflow-hidden">
        <View className="bg-white/90">
          <FoodList foods={popularFood} />
        </View>
      </BlurView>
    </Animated.View>
  )
}

export default PopularFood
