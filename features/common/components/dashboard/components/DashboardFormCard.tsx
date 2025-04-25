import {
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  View,
} from 'react-native'
import React, { useState } from 'react'
import StoreCategory from '@/features/common/components/storeCategory/StoreCategory'
import PopularFood from '@/features/common/components/popularFood/PopularFood'
import NewlyAddFood from '@/features/common/components/newlyAddFood/NewlyAddFood'
import DashboardSearch from './DashboardSearch'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import { useFetchNewlyAddedFoods } from '@/hooks/useQuery/common/fetch/useFetchNewlyAddedFoods'
import Typo from '@/components/common/typo'

const DashboardFormCard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { refetch: refetchStores } = useFetchAllStores()
  const { refetch: refetchPopularFoods } = useFetchAllPopularFoods()
  const { refetch: refetchNewlyAddedFoods } = useFetchNewlyAddedFoods()

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetchStores()
    await refetchPopularFoods()
    await refetchNewlyAddedFoods()
    setIsRefreshing(false)
  }

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isRefreshing) {
    content = (
      <>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Typo>Loading</Typo>
        </View>
      </>
    )
  } else {
    content = (
      <>
        <StoreCategory />
        <PopularFood />
        <NewlyAddFood />
      </>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-emerald-50">
      <ScrollView
        className="flex gap-10 px-7 py-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <DashboardSearch />
        {content}
      </ScrollView>
    </SafeAreaView>
  )
}

export default DashboardFormCard
