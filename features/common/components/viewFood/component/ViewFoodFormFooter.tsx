import { View, Animated, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import { Food, Store, UserType } from '@/utils/types'
import Typo from '@/components/common/typo'
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { useUserAddCart } from '@/hooks/useMutation/common/useUserAddCart'
import { serverTimestamp } from '@/lib/firestore'
import { useAuth } from '@/context/auth'
import { useRouter } from 'expo-router'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { getUserCartRoutes } from '@/features/common/parts/getUserCartRoutes'

interface ViewFoodFormFooterProps {
  food: Food | null | undefined
  store: Store | null | undefined
}

const ViewFoodFormFooter = ({ food, store }: ViewFoodFormFooterProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const { data: userData } = useGetUserByUserId({ id: user?.uid })
  const { mutate: addToCart, isPending } = useUserAddCart()
  const [foodPrice, setFoodPrice] = useState<number>(food?.price ?? 0)
  const [foodQuantity, setFoodQuantity] = useState<number>(1)
  const [foodIncrementLimit, setFoodIncrementLimit] = useState<boolean>(false)
  const [foodDecrementLimit, setFoodDecrementLimit] = useState<boolean>(false)
  const scaleAnim = useRef(new Animated.Value(1)).current

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

    addToCart(
      {
        foodId: food.id,
        storeOwnerId: store.userId ?? '',
        userId: user?.uid ?? '',
        storeId: store.id,
        gcashImage: store.gcashImage ?? '',
        quantity: foodQuantity,
        totalPrice: foodPrice,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      {
        onSuccess: () => {
          const route = getUserCartRoutes({ type: userData?.type })
          router.push(route)
        },
      },
    )
  }

  return (
    <View className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-2xl shadow-sm">
      <View className="flex-row items-center justify-between mb-5">
        <View>
          <Typo className="text-gray-500 text-sm mb-1 font-medium">Price</Typo>
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

      {userData?.type !== UserType.ADMIN && userData?.id !== store?.userId && (
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
      )}

      {(foodIncrementLimit || foodDecrementLimit) && (
        <View className="mt-4 bg-red-50 p-4 rounded-xl">
          <View className="flex-row items-center justify-center gap-2">
            <MaterialIcons name="error-outline" size={20} color="#EF4444" />
            <Typo className="text-red-600 text-base font-medium">
              {foodIncrementLimit
                ? 'Maximum quantity reached!'
                : 'Minimum quantity is 1'}
            </Typo>
          </View>
        </View>
      )}
    </View>
  )
}

export default ViewFoodFormFooter
