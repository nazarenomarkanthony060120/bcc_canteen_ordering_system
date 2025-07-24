import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native'
import PagerView from 'react-native-pager-view'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useAuth } from '@/context/auth'
import { useFetchTodaysFoods } from '@/hooks/useQuery/seller/useFetchTodaysFoods'
import Typo from '@/components/common/typo'

interface MenuOfTheDayProps {
  storeId: string | undefined
}

const { width: screenWidth } = Dimensions.get('window')

const MenuOfTheDay = ({ storeId }: MenuOfTheDayProps) => {
  const auth = useAuth()
  const [currentPage, setCurrentPage] = useState(0)
  const pagerRef = useRef<PagerView>(null)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  // Fetch today's foods
  const { data: todaysFoods, isLoading } = useFetchTodaysFoods({ id: storeId })

  useEffect(() => {
    if (todaysFoods && todaysFoods.length > 0) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [todaysFoods])

  // Don't render if no foods created today
  if (isLoading || !todaysFoods || todaysFoods.length === 0) {
    return (
      <View className="my-4">
        <View className="flex-row justify-between items-center px-4 mb-3">
          <View className="flex-row items-center">
            <MaterialIcons name="restaurant-menu" size={24} color="#667eea" />
            <Typo className="text-xl font-bold text-gray-800 ml-2">
              Food of the Day
            </Typo>
          </View>
          <View className="bg-gray-400 rounded-xl px-2 py-1 min-w-6 items-center">
            <Text className="text-white text-xs font-bold">0</Text>
          </View>
        </View>
        <View className="mx-4 p-4 bg-gray-100 rounded-2xl">
          <Text className="text-gray-600 text-center">
            {isLoading ? 'Loading...' : 'No food created today'}
          </Text>
          <Text className="text-gray-500 text-xs text-center mt-1">
            StoreId={storeId}
          </Text>
          <Text className="text-gray-500 text-xs text-center mt-1">
            New Foods={todaysFoods?.length || 0}
          </Text>
        </View>
      </View>
    )
  }

  const formatPrice = (price: number) => {
    return `₱${price.toFixed(2)}`
  }

  const getFoodTypeIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      Vegetable: 'carrot',
      Fruits: 'apple-alt',
      Meat: 'drumstick-bite',
      Snacks: 'cookie-bite',
      Drinks: 'coffee',
      Rice: 'seedling',
      Other: 'utensils',
    }
    return iconMap[type] || 'utensils'
  }

  const renderFoodCard = (food: any, index: number) => (
    <View key={food.id} className="flex-1 px-4">
      <Animated.View
        className="flex-1 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1"
        >
          {/* Food Image */}
          <View className="h-40 relative">
            <Image
              source={{ uri: `data:image/jpeg;base64,${food.image}` }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.4)']}
              className="absolute bottom-0 left-0 right-0 h-20"
            />
          </View>

          {/* Content */}
          <View className="flex-1 p-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center bg-white/20 rounded-xl px-2 py-1">
                <FontAwesome5
                  name={getFoodTypeIcon(food.type)}
                  size={14}
                  color="#FFD700"
                />
                <Text className="text-yellow-300 text-xs font-semibold ml-1">
                  {food.type}
                </Text>
              </View>
              <View className="flex-row items-center bg-white/20 rounded-xl px-2 py-1">
                <MaterialIcons name="inventory" size={12} color="#4CAF50" />
                <Text className="text-green-400 text-xs font-semibold ml-1">
                  {food.quantity}
                </Text>
              </View>
            </View>

            {/* Food Name */}
            <Text
              className="text-white text-xl font-bold mb-2 leading-6"
              numberOfLines={2}
            >
              {food.name}
            </Text>

            {/* Description */}
            <Text
              className="text-white/80 text-sm leading-5 mb-3 flex-1"
              numberOfLines={3}
            >
              {food.description}
            </Text>

            {/* Footer */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white/60 text-xs mb-1">Price</Text>
                <Text className="text-yellow-300 text-xl font-bold">
                  {formatPrice(food.price)}
                </Text>
              </View>
              <View className="flex-row items-center bg-white/20 rounded-xl px-2 py-1">
                <MaterialIcons name="favorite" size={16} color="#FF6B6B" />
                <Text className="text-red-400 text-xs font-semibold ml-1">
                  {food.popularity}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  )

  return (
    <Animated.View className="my-4" style={{ opacity: fadeAnim }}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <View className="flex-row items-center">
          <MaterialIcons name="restaurant-menu" size={24} color="#667eea" />
          <Typo className="text-xl font-bold text-gray-800 ml-2">
            Food of the Day
          </Typo>
        </View>
        <View className="bg-blue-500 rounded-xl px-2 py-1 min-w-6 items-center">
          <Text className="text-white text-xs font-bold">
            {todaysFoods.length}
          </Text>
        </View>
      </View>

      {/* Carousel */}
      <PagerView
        ref={pagerRef}
        style={{ height: 320 }}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {todaysFoods.map((food, index) => renderFoodCard(food, index))}
      </PagerView>

      {/* Page Indicators */}
      {todaysFoods.length > 1 && (
        <View className="flex-row justify-center items-center mt-3 px-4">
          {todaysFoods.map((_, index) => (
            <TouchableOpacity
              key={index}
              className={`h-2 rounded-full mx-1 ${
                currentPage === index ? 'w-5 bg-blue-500' : 'w-2 bg-blue-500/30'
              }`}
              onPress={() => {
                pagerRef.current?.setPage(index)
                setCurrentPage(index)
              }}
            />
          ))}
        </View>
      )}
    </Animated.View>
  )
}

export default MenuOfTheDay
