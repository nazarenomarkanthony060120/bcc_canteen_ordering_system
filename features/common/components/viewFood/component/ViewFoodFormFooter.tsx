import { View, Animated, Pressable, Alert } from 'react-native'
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
import { useCheckDailyCartLimit } from '@/hooks/useQuery/common/useCheckDailyCartLimit'
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
  const { data: dailyLimitData, refetch: refetchDailyLimit } =
    useCheckDailyCartLimit({ id: user?.uid })
  const [foodPrice, setFoodPrice] = useState<number>(food?.price ?? 0)
  const [foodQuantity, setFoodQuantity] = useState<number>(1)
  const [foodIncrementLimit, setFoodIncrementLimit] = useState<boolean>(false)
  const [foodDecrementLimit, setFoodDecrementLimit] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
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

    // Clear any previous error messages
    setErrorMessage('')

    // Check if user has reached daily limit
    if (dailyLimitData && !dailyLimitData.canAddToCart) {
      setErrorMessage(
        `Daily limit reached! You can only add ${dailyLimitData.limit} items per day. You have already added ${dailyLimitData.currentCount} items today.`,
      )

      Alert.alert(
        'Daily Limit Reached',
        `You can only add ${dailyLimitData.limit} items to cart per day. You have already added ${dailyLimitData.currentCount} items today. Please try again tomorrow.`,
        [{ text: 'OK', style: 'default' }],
      )
      return
    }

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
          // Refetch daily limit data to update the UI
          refetchDailyLimit()
          const route = getUserCartRoutes({ type: userData?.type })
          router.push(route)
        },
        onError: (error) => {
          const errorMsg = error.message || 'Failed to add item to cart'
          setErrorMessage(errorMsg)

          if (errorMsg.includes('Daily cart limit reached')) {
            Alert.alert('Daily Limit Reached', errorMsg, [
              { text: 'OK', style: 'default' },
            ])
          } else {
            Alert.alert('Error', errorMsg, [{ text: 'OK', style: 'default' }])
          }
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

      {/* Daily Cart Limit Information */}
      {userData?.type !== UserType.ADMIN &&
        userData?.id !== store?.userId &&
        dailyLimitData && (
          <View
            className={`mb-4 p-3 rounded-xl ${
              dailyLimitData.remainingCount === 0
                ? 'bg-red-50 border border-red-200'
                : dailyLimitData.remainingCount === 1
                  ? 'bg-yellow-50 border border-yellow-200'
                  : 'bg-blue-50 border border-blue-200'
            }`}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialIcons
                  name={dailyLimitData.remainingCount === 0 ? 'error' : 'info'}
                  size={18}
                  color={
                    dailyLimitData.remainingCount === 0
                      ? '#EF4444'
                      : dailyLimitData.remainingCount === 1
                        ? '#F59E0B'
                        : '#3B82F6'
                  }
                />
                <Typo
                  className={`ml-2 text-sm font-medium ${
                    dailyLimitData.remainingCount === 0
                      ? 'text-red-700'
                      : dailyLimitData.remainingCount === 1
                        ? 'text-yellow-700'
                        : 'text-blue-700'
                  }`}
                >
                  Daily Cart Limit
                </Typo>
              </View>
              <Typo
                className={`text-sm font-bold ${
                  dailyLimitData.remainingCount === 0
                    ? 'text-red-700'
                    : dailyLimitData.remainingCount === 1
                      ? 'text-yellow-700'
                      : 'text-blue-700'
                }`}
              >
                {dailyLimitData.currentCount}/{dailyLimitData.limit}
              </Typo>
            </View>
            <Typo
              className={`text-xs mt-1 ${
                dailyLimitData.remainingCount === 0
                  ? 'text-red-600'
                  : dailyLimitData.remainingCount === 1
                    ? 'text-yellow-600'
                    : 'text-blue-600'
              }`}
            >
              {dailyLimitData.remainingCount === 0
                ? 'You have reached your daily limit. Try again tomorrow.'
                : `You can add ${dailyLimitData.remainingCount} more item${dailyLimitData.remainingCount === 1 ? '' : 's'} today.`}
            </Typo>
          </View>
        )}

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
            disabled={
              isPending ||
              (dailyLimitData && !dailyLimitData.canAddToCart) ||
              (food?.quantity ?? 0) === 0
            }
            className={`rounded-xl flex-row items-center gap-2 px-6 py-3 shadow-sm ${
              isPending ||
              (dailyLimitData && !dailyLimitData.canAddToCart) ||
              (food?.quantity ?? 0) === 0
                ? 'bg-gray-400'
                : 'bg-emerald-500'
            }`}
          >
            <AntDesign name="shoppingcart" size={20} color="white" />
            <Typo className="text-white font-semibold">
              {isPending
                ? 'Checking out...'
                : (food?.quantity ?? 0) === 0
                  ? 'Out of Stock'
                  : dailyLimitData && !dailyLimitData.canAddToCart
                    ? 'Limit Reached'
                    : 'Check Out'}
            </Typo>
          </Pressable>
        </View>
      )}

      {(foodIncrementLimit || foodDecrementLimit || errorMessage) && (
        <View className="mt-4 bg-red-50 p-4 rounded-xl border border-red-200">
          <View className="flex-row items-center justify-center gap-2">
            <MaterialIcons name="error-outline" size={20} color="#EF4444" />
            <Typo className="text-red-600 text-base font-medium text-center">
              {errorMessage ||
                (foodIncrementLimit
                  ? 'Maximum quantity reached!'
                  : 'Minimum quantity is 1')}
            </Typo>
          </View>
        </View>
      )}
    </View>
  )
}

export default ViewFoodFormFooter
