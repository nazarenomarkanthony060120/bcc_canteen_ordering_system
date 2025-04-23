import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import StoreCategory from '@/features/common/components/storeCategory/StoreCategory'
import PopularFood from '@/features/common/components/popularFood/PopularFood'
import NewlyAddFood from '@/features/common/components/newlyAddFood/NewlyAddFood'
import DashboardSearch from './DashboardSearch'

const DashboardFormCard = () => {
  return (
    <ScrollView
      className="flex gap-10 px-7 py-4"
      showsVerticalScrollIndicator={false}
    >
      <DashboardSearch />
      <StoreCategory />
      <PopularFood />
      <NewlyAddFood />
    </ScrollView>
  )
}

export default DashboardFormCard
