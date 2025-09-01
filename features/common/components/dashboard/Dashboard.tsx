import React, { useState, useRef } from 'react'
import { View, Animated, ScrollView, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import ScreenLayout from '../screenLayout/ScreenLayout'
import Typo from '@/components/common/typo'
import DashboardHeader from './components/DashboardHeader'
import DashboardCategories from './components/DashboardCategories'
import DashboardFormCard from './components/DashboardFormCard'
import DashboardSkeleton from './components/skeletons/DashboardSkeleton'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { useAuth } from '@/context/auth'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import { useFetchNewlyAddedFoods } from '@/hooks/useQuery/common/fetch/useFetchNewlyAddedFoods'
import { FoodType } from '@/utils/types'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'

const Dashboard = () => {
  const auth = useAuth()
  const { refetch: refetchUser, isLoading: isLoadingUser } = useGetUserByUserId(
    {
      id: auth.user?.uid,
    },
  )
  const { refetch: refetchPopularFood, isLoading: isLoadingPopularFood } =
    useFetchAllPopularFoods()
  const { refetch: refetchNewlyAddedFood, isLoading: isLoadingNewlyAddedFood } =
    useFetchNewlyAddedFoods()
  const { refetch: refetchStores, isLoading: isLoadingStores } =
    useFetchAllStores()

  const [refreshing, setRefreshing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('1')
  const [searchQuery, setSearchQuery] = useState('')
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false)
      refetchUser()
      refetchPopularFood()
      refetchNewlyAddedFood()
      refetchStores()
    }, 2000)
  }, [])

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleSearch = (text: string) => {
    setSearchQuery(text)
    // Implement search logic here
  }

  const handleFilter = () => {
    // Implement filter logic here
  }

  const getSelectedFoodType = (categoryId: string): FoodType | null => {
    switch (categoryId) {
      case '1': // All
        return null
      case '2': // Vegetable
        return FoodType.VEGETABLE
      case '3': // Fruits
        return FoodType.FRUITS
      case '4': // Meat
        return FoodType.MEAT
      case '5': // Snacks
        return FoodType.SNACKS
      case '6': // Drinks
        return FoodType.DRINKS
      case '7': // Rice
        return FoodType.RICE
      case '8': // Other
        return FoodType.OTHER
      default:
        return null
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  // Check if we're in initial loading state (not refreshing)
  const isInitialLoading =
    !refreshing &&
    (isLoadingUser ||
      isLoadingPopularFood ||
      isLoadingNewlyAddedFood ||
      isLoadingStores)

  // Show skeleton during initial loading
  if (isInitialLoading) {
    return <DashboardSkeleton />
  }

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1">
        <LinearGradient
          colors={['#F0FDF4', '#FFFFFF']}
          className="flex-1"
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1"
          >
            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#10B981"
                />
              }
            >
              <View className="p-4">
                <DashboardHeader />
                {/* <DashboardSearch
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                /> */}
                <DashboardCategories
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                />
                <BlurView
                  intensity={10}
                  className="rounded-3xl overflow-hidden"
                >
                  <View className="bg-white/90 p-4">
                    <View className="flex-row items-center justify-between mb-4">
                      <Typo className="text-gray-800 font-semibold">
                        Popular Items
                      </Typo>
                    </View>
                    <DashboardFormCard
                      selectedFoodType={getSelectedFoodType(selectedCategory)}
                    />
                  </View>
                </BlurView>
              </View>
            </ScrollView>
          </Animated.View>
        </LinearGradient>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default Dashboard
