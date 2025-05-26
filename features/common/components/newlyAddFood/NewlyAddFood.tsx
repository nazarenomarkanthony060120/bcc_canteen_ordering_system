import {
  View,
  Animated,
  ScrollView,
  RefreshControl,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import NewAddFoodList from './component/NewAddFoodList'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import { useFetchNewlyAddedFoods } from '@/hooks/useQuery/common/fetch/useFetchNewlyAddedFoods'
import ScreenLayout from '../screenLayout/ScreenLayout'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import { Food, FoodType } from '@/utils/types'
import { useRouter } from 'expo-router'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'

type SortOption = 'price-asc' | 'price-desc' | 'popularity' | 'newest'

interface NewlyAddFoodProps {
  selectedFoodType: FoodType | null
}

const NewlyAddFood: React.FC<NewlyAddFoodProps> = ({ selectedFoodType }) => {
  const router = useRouter()
  const {
    data: newlyAddedFood,
    isFetching,
    refetch,
  } = useFetchNewlyAddedFoods()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const shimmerAnim = useRef(new Animated.Value(0)).current
  const [refreshing, setRefreshing] = React.useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([])
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start()

    // Shimmer animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  useEffect(() => {
    if (newlyAddedFood) {
      let sorted = [...newlyAddedFood]
      switch (sortBy) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price)
          break
        case 'popularity':
          sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          break
        case 'newest':
          sorted.sort((a, b) => {
            const dateA = a.createdAt
              ? (a.createdAt as any).toDate().getTime()
              : 0
            const dateB = b.createdAt
              ? (b.createdAt as any).toDate().getTime()
              : 0
            return dateB - dateA
          })
          break
      }
      setFilteredFoods(sorted)
    }
  }, [newlyAddedFood, sortBy])

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }, [refetch])

  const handleFoodPress = (foodId: string) => {
    router.push(`/screens/common/viewFood?foodId=${foodId}`)
  }

  const handleImageError = (foodId: string) => {
    setImageErrors((prev) => ({ ...prev, [foodId]: true }))
  }

  const renderSortOptions = () => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="absolute right-4 top-16 z-10 bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <Pressable
        onPress={() => setSortBy('newest')}
        className={`px-4 py-3 ${sortBy === 'newest' ? 'bg-emerald-50' : ''}`}
      >
        <View className="flex-row items-center gap-2">
          <MaterialIcons
            name="new-releases"
            size={20}
            color={sortBy === 'newest' ? '#10B981' : '#6B7280'}
          />
          <Typo
            className={`${
              sortBy === 'newest' ? 'text-emerald-600' : 'text-gray-600'
            }`}
          >
            Newest First
          </Typo>
        </View>
      </Pressable>
      <Pressable
        onPress={() => setSortBy('price-asc')}
        className={`px-4 py-3 ${sortBy === 'price-asc' ? 'bg-emerald-50' : ''}`}
      >
        <View className="flex-row items-center gap-2">
          <MaterialIcons
            name="arrow-upward"
            size={20}
            color={sortBy === 'price-asc' ? '#10B981' : '#6B7280'}
          />
          <Typo
            className={`${
              sortBy === 'price-asc' ? 'text-emerald-600' : 'text-gray-600'
            }`}
          >
            Price: Low to High
          </Typo>
        </View>
      </Pressable>
      <Pressable
        onPress={() => setSortBy('price-desc')}
        className={`px-4 py-3 ${
          sortBy === 'price-desc' ? 'bg-emerald-50' : ''
        }`}
      >
        <View className="flex-row items-center gap-2">
          <MaterialIcons
            name="arrow-downward"
            size={20}
            color={sortBy === 'price-desc' ? '#10B981' : '#6B7280'}
          />
          <Typo
            className={`${
              sortBy === 'price-desc' ? 'text-emerald-600' : 'text-gray-600'
            }`}
          >
            Price: High to Low
          </Typo>
        </View>
      </Pressable>
      <Pressable
        onPress={() => setSortBy('popularity')}
        className={`px-4 py-3 ${
          sortBy === 'popularity' ? 'bg-emerald-50' : ''
        }`}
      >
        <View className="flex-row items-center gap-2">
          <MaterialIcons
            name="star"
            size={20}
            color={sortBy === 'popularity' ? '#10B981' : '#6B7280'}
          />
          <Typo
            className={`${
              sortBy === 'popularity' ? 'text-emerald-600' : 'text-gray-600'
            }`}
          >
            Most Popular
          </Typo>
        </View>
      </Pressable>
    </Animated.View>
  )

  if (isFetching) return <LoadingIndicator />

  const filteredFoodsByType = selectedFoodType
    ? filteredFoods.filter((food) => food.type === selectedFoodType)
    : filteredFoods

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-1"
        >
          <LinearGradient
            colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0"
          />
          <BlurView intensity={25} tint="light" className="flex-1">
            <View className="px-4 pt-4">
              <View className="flex-row items-center justify-between mb-4">
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                  }}
                  className="flex-row items-center gap-2"
                >
                  <View className="bg-emerald-500 p-2 rounded-full">
                    <MaterialIcons
                      name="new-releases"
                      size={20}
                      color="white"
                    />
                  </View>
                  <Typo className="text-lg font-bold text-gray-800">
                    Newly Added Foods
                  </Typo>
                </Animated.View>
                <Pressable
                  onPress={() => setShowSortOptions(!showSortOptions)}
                  className="bg-white p-2 rounded-full"
                >
                  <MaterialIcons
                    name="sort"
                    size={24}
                    color={showSortOptions ? '#10B981' : '#6B7280'}
                  />
                </Pressable>
              </View>
              {showSortOptions && renderSortOptions()}
            </View>

            <ScrollView
              className="flex-1"
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#10B981"
                  colors={['#10B981']}
                />
              }
            >
              {filteredFoodsByType?.length === 0 ? (
                <View className="flex-1 items-center justify-center p-8">
                  <Animated.View
                    style={{
                      opacity: fadeAnim,
                      transform: [
                        {
                          scale: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.9, 1],
                          }),
                        },
                      ],
                    }}
                    className="bg-white/80 p-6 rounded-2xl items-center"
                  >
                    <MaterialIcons
                      name="restaurant"
                      size={48}
                      color="#10B981"
                      className="mb-4"
                    />
                    <Typo className="text-gray-600 text-lg text-center">
                      No new foods have been added yet.
                    </Typo>
                    <Typo className="text-gray-500 text-sm text-center mt-2">
                      Check back later for new menu items!
                    </Typo>
                  </Animated.View>
                </View>
              ) : (
                <View className="px-4 pb-8">
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row"
                  >
                    {filteredFoodsByType.map((food) => (
                      <TouchableOpacity
                        key={food.id}
                        className="mr-4 w-52"
                        onPress={() => handleFoodPress(food.id)}
                      >
                        <BlurView
                          intensity={10}
                          className="rounded-2xl overflow-hidden"
                        >
                          <View className="bg-white/90">
                            <View className="mb-2">
                              {!imageErrors[food.id] ? (
                                <View className="overflow-hidden rounded-xl">
                                  <ImageWrapper
                                    source={
                                      food.image
                                        ? {
                                            uri: `data:image/jpeg;base64,${food.image}`,
                                          }
                                        : CANTEEN_IMAGE
                                    }
                                    style={{ height: 150, width: '100%' }}
                                  />
                                </View>
                              ) : (
                                <View className="w-full h-full bg-gray-200 items-center justify-center">
                                  <MaterialIcons
                                    name="restaurant"
                                    size={32}
                                    color="#9CA3AF"
                                  />
                                </View>
                              )}
                            </View>
                            <View className="p-4">
                              <Typo className="text-gray-800 font-medium mb-1">
                                {food.name}
                              </Typo>
                              <View className="flex-row items-center justify-between">
                                <Typo className="text-emerald-600 font-semibold">
                                  ₱{food.price.toFixed(2)}
                                </Typo>
                                <View className="flex-row items-center">
                                  <MaterialIcons
                                    name="new-releases"
                                    size={16}
                                    color="#10B981"
                                  />
                                  <Typo className="text-gray-600 text-sm ml-1">
                                    New
                                  </Typo>
                                </View>
                              </View>
                            </View>
                          </View>
                        </BlurView>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </ScrollView>
          </BlurView>
        </Animated.View>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default NewlyAddFood
