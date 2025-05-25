import React, { useState, useRef } from 'react'
import {
  View,
  Animated,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import ScreenLayout from '../screenLayout/ScreenLayout'
import Typo from '@/components/common/typo'
import DashboardHeader from './components/DashboardHeader'
import DashboardSearch from './components/DashboardSearch'
import DashboardCategories from './components/DashboardCategories'
import DashboardFormCard from './components/DashboardFormCard'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { useAuth } from '@/context/auth'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import { useFetchNewlyAddedFoods } from '@/hooks/useQuery/common/fetch/useFetchNewlyAddedFoods'

const Dashboard = () => {
  const auth = useAuth()
  const { refetch: refetchUser } = useGetUserByUserId({ id: auth.user?.uid })
  const { refetch: refetchPopularFood } = useFetchAllPopularFoods()
  const { refetch: refetchNewlyAddedFood } = useFetchNewlyAddedFoods()

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
                <DashboardSearch
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                />
                <DashboardCategories
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
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
                      <TouchableOpacity>
                        <Typo className="text-emerald-600">See All</Typo>
                      </TouchableOpacity>
                    </View>
                    <DashboardFormCard />
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
