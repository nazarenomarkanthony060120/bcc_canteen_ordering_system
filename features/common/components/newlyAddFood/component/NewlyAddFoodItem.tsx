import { Pressable, View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Food } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import Typo from '@/components/common/typo'
import { CANTEEN_IMAGE } from '@/constants/image'
import { useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'

interface NewlyAddFoodItemProps {
  food: Food
}

const NewlyAddFoodItem = ({ food }: NewlyAddFoodItemProps) => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

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
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()

    router.push(`/screens/common/viewFood?foodId=${food.id}`)
  }

  return (
    <Pressable onPress={navigateToViewFood} className="mb-4">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        }}
      >
        <BlurView
          intensity={15}
          tint="light"
          className="rounded-2xl overflow-hidden"
        >
          <View className="bg-white/95">
            <View className="relative">
              <ImageWrapper
                source={CANTEEN_IMAGE}
                className="rounded-t-2xl"
                style={{ height: 160, width: '100%' }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                className="absolute bottom-0 left-0 right-0 h-20"
              />
              <View className="absolute bottom-3 left-3 right-3">
                <View className="flex-row items-center justify-between">
                  <View className="bg-emerald-500 px-3 py-1.5 rounded-full">
                    <Typo className="text-white text-sm font-medium">
                      New Item
                    </Typo>
                  </View>
                  <View className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                    <View className="flex-row items-center">
                      <MaterialIcons name="star" size={14} color="#FCD34D" />
                      <Typo className="text-white text-xs ml-1">
                        {food.popularity || 0}
                      </Typo>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="p-4">
              <View className="flex-row items-start gap-3">
                <View className="bg-emerald-50 p-2 rounded-full mt-1">
                  <MaterialIcons name="restaurant" size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Typo className="text-gray-800 font-semibold text-lg mb-1">
                    {food.name}
                  </Typo>
                  {food.description && (
                    <Typo className="text-gray-500 text-sm mb-2">
                      {food.description.length > 60
                        ? `${food.description.substring(0, 60)}...`
                        : food.description}
                    </Typo>
                  )}
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <FontAwesome6
                        name="peso-sign"
                        size={16}
                        color="#10B981"
                      />
                      <Typo className="text-emerald-600 font-medium text-lg ml-1">
                        {food.price}
                      </Typo>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <View className="bg-emerald-50 px-3 py-1 rounded-full">
                        <View className="flex-row items-center">
                          <MaterialIcons
                            name="inventory"
                            size={14}
                            color="#10B981"
                          />
                          <Typo className="text-emerald-600 text-xs ml-1">
                            {food.quantity} available
                          </Typo>
                        </View>
                      </View>
                      {food.type && (
                        <View className="bg-emerald-50 px-3 py-1 rounded-full">
                          <View className="flex-row items-center">
                            <MaterialIcons
                              name="category"
                              size={14}
                              color="#10B981"
                            />
                            <Typo className="text-emerald-600 text-xs ml-1">
                              {food.type}
                            </Typo>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>

              <View className="mt-4">
                <Pressable
                  onPress={navigateToViewFood}
                  className="bg-emerald-500 px-4 py-2 rounded-full flex-row items-center justify-center gap-2"
                >
                  <MaterialIcons name="visibility" size={20} color="white" />
                  <Typo className="text-white font-medium">
                    View Food Details
                  </Typo>
                </Pressable>
              </View>
            </View>
          </View>
        </BlurView>
      </Animated.View>
    </Pressable>
  )
}

export default NewlyAddFoodItem
