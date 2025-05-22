import { View, Animated, Pressable, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Food, Store } from '@/utils/types'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import Button from '@/components/common/button'
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons'
import { useUserAddCart } from '@/hooks/useMutation/common/useUserAddCart'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { serverTimestamp } from '@/lib/firestore'
import { useAuth } from '@/context/auth'

interface ViewFoodFormCardProps {
  food: Food | null | undefined
  store: Store | null | undefined
}

const ViewFoodFormCard = ({ food, store }: ViewFoodFormCardProps) => {
  const auth = useAuth()

  const { mutate: addToCart, isPending } = useUserAddCart()
  const [foodPrice, setFoodPrice] = useState<number>(food?.price ?? 0)
  const [foodQuantity, setFoodQuantity] = useState<number>(1)
  const [foodIncrementLimit, setFoodIncrementLimit] = useState<Boolean>(false)
  const [foodDecrementLimit, setFoodDecrementLimit] = useState<Boolean>(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(1)).current
  const heartScale = useRef(new Animated.Value(1)).current

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

  const increment = () => {
    if (foodQuantity >= (food?.quantity ?? 0)) {
      setFoodIncrementLimit(true)
      return foodQuantity
    }

    const newQuantity = foodQuantity + 1
    setFoodQuantity(newQuantity)
    setFoodPrice(newQuantity * (food?.price ?? 0))

    setFoodDecrementLimit(false)
    setFoodIncrementLimit(false)
  }

  const decrement = () => {
    if (foodQuantity <= 0) {
      setFoodDecrementLimit(true)
      return foodQuantity
    }

    const newQuantity = foodQuantity - 1
    setFoodQuantity(newQuantity)
    setFoodPrice(newQuantity * (food?.price ?? 0))

    setFoodDecrementLimit(false)
    setFoodIncrementLimit(false)
  }

  const handleAddToCart = () => {
    if (!food || !store) return

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

    addToCart({
      foodId: food.id,
      userId: auth.user?.uid ?? '',
      quantity: foodQuantity,
      totalPrice: foodPrice,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }

  const toggleFavorite = () => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
    setIsFavorite(!isFavorite)
  }

  return (
    <Animated.View
      className="flex-1"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative">
          <ImageWrapper
            source={CANTEEN_IMAGE}
            className="w-full"
            style={{ height: 320 }}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            className="absolute bottom-0 left-0 right-0 h-40"
          />
          <View className="absolute top-4 right-4">
            <Pressable
              onPress={toggleFavorite}
              className="bg-white/20 backdrop-blur-md p-3 rounded-full"
            >
              <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                <AntDesign
                  name={isFavorite ? 'heart' : 'hearto'}
                  size={24}
                  color={isFavorite ? '#EF4444' : '#fff'}
                />
              </Animated.View>
            </Pressable>
          </View>
          <View className="absolute bottom-6 left-4 right-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="bg-emerald-500 px-4 py-2 rounded-full">
                <Typo className="text-white text-sm font-medium">
                  {food?.type || 'Food Item'}
                </Typo>
              </View>
              <View className="bg-white/20 backdrop-blur-md px-3 py-2 rounded-full">
                <View className="flex-row items-center">
                  <MaterialIcons name="star" size={18} color="#FCD34D" />
                  <Typo className="text-white text-sm ml-1 font-medium">
                    {food?.popularity || 0} Popular
                  </Typo>
                </View>
              </View>
            </View>
            <Typo className="text-white text-3xl font-bold mb-2">
              {food?.name}
            </Typo>
            <View className="flex-row items-center">
              <MaterialIcons name="store" size={18} color="#fff" />
              <Typo className="text-white/90 ml-2 text-base font-medium">
                {store?.store}
              </Typo>
            </View>
          </View>
        </View>

        <BlurView
          intensity={10}
          className="flex-1 rounded-t-3xl -mt-6 overflow-hidden"
        >
          <View className="bg-white/95 p-6">
            <View className="mb-6">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="bg-emerald-50 p-2 rounded-full">
                  <Ionicons
                    name="information-circle"
                    size={20}
                    color="#10B981"
                  />
                </View>
                <Typo className="text-gray-700 text-lg font-semibold">
                  Description
                </Typo>
              </View>
              <Typo className="text-gray-600 text-base leading-6">
                {food?.description}
              </Typo>
            </View>

            <View className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-2xl mb-6 shadow-sm">
              <View className="flex-row items-center justify-between mb-5">
                <View>
                  <Typo className="text-gray-500 text-sm mb-1 font-medium">
                    Price
                  </Typo>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="currency-php"
                      size={28}
                      color="#10B981"
                    />
                    <Typo className="text-emerald-600 text-3xl font-bold ml-1">
                      {foodPrice.toFixed(2)}
                    </Typo>
                  </View>
                </View>
                <View>
                  <Typo className="text-gray-500 text-sm mb-1 font-medium">
                    Available
                  </Typo>
                  <View className="flex-row items-center">
                    <MaterialIcons name="inventory" size={22} color="#10B981" />
                    <Typo className="text-emerald-600 text-2xl font-bold ml-1">
                      {food?.quantity}
                    </Typo>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <Pressable
                    className="bg-white p-3 rounded-xl shadow-sm"
                    onPress={decrement}
                  >
                    <Entypo name="minus" size={22} color="#10B981" />
                  </Pressable>
                  <Typo className="text-gray-800 text-2xl font-bold w-8 text-center">
                    {foodQuantity}
                  </Typo>
                  <Pressable
                    className="bg-white p-3 rounded-xl shadow-sm"
                    onPress={increment}
                  >
                    <Entypo name="plus" size={22} color="#10B981" />
                  </Pressable>
                </View>
                <Pressable
                  onPress={handleAddToCart}
                  disabled={isPending}
                  className="bg-emerald-500 rounded-xl flex-row items-center gap-2 px-6 py-3 shadow-sm"
                >
                  <AntDesign name="shoppingcart" size={20} color="white" />
                  <Typo className="text-white font-semibold">
                    {isPending ? 'Adding...' : 'Add to Cart'}
                  </Typo>
                </Pressable>
              </View>

              {(foodIncrementLimit || foodDecrementLimit) && (
                <View className="mt-4 bg-red-50 p-4 rounded-xl">
                  <View className="flex-row items-center justify-center gap-2">
                    <MaterialIcons
                      name="error-outline"
                      size={20}
                      color="#EF4444"
                    />
                    <Typo className="text-red-600 text-base font-medium">
                      {foodIncrementLimit
                        ? 'Maximum quantity reached!'
                        : 'Minimum quantity is 1'}
                    </Typo>
                  </View>
                </View>
              )}
            </View>
          </View>
        </BlurView>
      </ScrollView>
    </Animated.View>
  )
}

export default ViewFoodFormCard
