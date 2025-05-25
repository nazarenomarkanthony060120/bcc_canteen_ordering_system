import { View, Pressable, Animated } from 'react-native'
import React, { useRef } from 'react'
import { Food } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import Typo from '@/components/common/typo'
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
import { CANTEEN_IMAGE } from '@/constants/image'
import { useRouter } from 'expo-router'
import { getRatingFromPopularity } from '@/features/common/parts/getFoodPopularity'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

interface PopularFoodItemProps {
  food: Food
}

const PopularFoodItem = ({ food }: PopularFoodItemProps) => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(1)).current

  const navigateToViewFood = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start()

    router.push(`/screens/common/viewFood?foodId=${food.id}`)
  }

  const popularity = food.popularity / 5

  return (
    <Pressable key={food.id} onPress={navigateToViewFood} className="mb-4 mr-5">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <BlurView intensity={10} className="rounded-2xl overflow-hidden">
          <View className="bg-white/90">
            <View className="relative">
              <View className="overflow-hidden rounded-xl">
                <ImageWrapper
                  source={
                    food.image
                      ? { uri: `data:image/jpeg;base64,${food.image}` }
                      : CANTEEN_IMAGE
                  }
                  style={{ height: 150, width: 160 }}
                />
              </View>
              <View className="absolute bottom-2 left-2 right-2">
                <View className="flex-row items-center justify-between">
                  <View className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={14} color="#FCD34D" />
                      <Typo className="text-white text-xs ml-1">
                        {' '}
                        {getRatingFromPopularity(popularity)}
                      </Typo>
                    </View>
                  </View>
                  <View className="bg-emerald-500 px-2 py-1 rounded-full">
                    <Typo className="text-white text-xs">Popular</Typo>
                  </View>
                </View>
              </View>
            </View>
            <View className="p-3">
              <Typo className="text-gray-800 font-semibold mb-1">
                {food.name}
              </Typo>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <FontAwesome6 name="peso-sign" size={16} color="#10B981" />
                  <Typo className="text-emerald-600 font-semibold ml-1">
                    {food.price}
                  </Typo>
                </View>
                <View className="bg-emerald-50 px-2 py-1 rounded-full">
                  <Typo className="text-emerald-600 text-xs">View Details</Typo>
                </View>
              </View>
            </View>
          </View>
        </BlurView>
      </Animated.View>
    </Pressable>
  )
}

export default PopularFoodItem
