import { ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import StoreCategory from '@/features/common/components/storeCategory/StoreCategory'
import PopularFood from '@/features/common/components/popularFood/PopularFood'
import NewlyAddFood from '@/features/common/components/newlyAddFood/NewlyAddFood'
import DashboardSearch from './DashboardSearch'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import { useFetchNewlyAddedFoods } from '@/hooks/useQuery/common/fetch/useFetchNewlyAddedFoods'

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
        <StoreCategory />
        <PopularFood />
        <NewlyAddFood />
      </ScrollView>
    </SafeAreaView>
  )
}

export default DashboardFormCard
