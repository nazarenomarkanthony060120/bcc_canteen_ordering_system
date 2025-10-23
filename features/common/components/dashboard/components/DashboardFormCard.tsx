import { ScrollView, RefreshControl, Animated, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import StoreCategory from '@/features/common/components/storeCategory/StoreCategory'
import PopularFood from '@/features/common/components/popularFood/PopularFood'
import NewlyAddFood from '@/features/common/components/newlyAddFood/NewlyAddFood'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import { useFetchNewlyAddedFoods } from '@/hooks/useQuery/common/fetch/useFetchNewlyAddedFoods'
import LoadingIndicator from '../../loadingIndicator/LoadingIndicator'
import { BlurView } from 'expo-blur'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { FoodType } from '@/utils/types'

interface DashboardFormCardProps {
  selectedFoodType: FoodType | null
}

const DashboardFormCard: React.FC<DashboardFormCardProps> = ({
  selectedFoodType,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  const { refetch: refetchStores } = useFetchAllStores()
  const { refetch: refetchPopularFoods } = useFetchAllPopularFoods()
  const { refetch: refetchNewlyAddedFoods } = useFetchNewlyAddedFoods()

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

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetchStores()
    await refetchPopularFoods()
    await refetchNewlyAddedFoods()
    setIsRefreshing(false)
  }

  if (isRefreshing) return <LoadingIndicator />

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <BlurView intensity={10} className="rounded-3xl overflow-hidden">
        <View className="bg-white/90">
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor="#10B981"
              />
            }
          >
            <View className="">
              <StoreCategory />

              <View className="flex-row items-center gap-2 mt-6 mb-4">
                <View className="bg-emerald-50 p-2 rounded-full">
                  <MaterialIcons name="star" size={20} color="#10B981" />
                </View>
                <Typo className="text-gray-800 font-semibold">
                  Popular Foods
                </Typo>
              </View>
              <PopularFood selectedFoodType={selectedFoodType} />

              <View className="flex-row items-center gap-2 mt-6 mb-4">
                <View className="bg-emerald-50 p-2 rounded-full">
                  <MaterialIcons
                    name="new-releases"
                    size={20}
                    color="#10B981"
                  />
                </View>
                <Typo className="text-gray-800 font-semibold">
                  New Arrivals
                </Typo>
              </View>
              <NewlyAddFood selectedFoodType={selectedFoodType} />
            </View>
          </ScrollView>
        </View>
      </BlurView>
    </Animated.View>
  )
}

export default DashboardFormCard
