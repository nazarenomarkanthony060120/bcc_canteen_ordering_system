import { View } from 'react-native'
import React from 'react'
import DashboardShopSales from './components/dashboardShopSales/DashboardShopSales'

const DashBoardQueryResult = () => {
  return (
    <View className='flex flex-wrap flex-row space-x-2 space-y-2 gap-4'>
      <DashboardShopSales />
      <DashboardShopSales />
      <DashboardShopSales />
      <DashboardShopSales />
      <DashboardShopSales />
      <DashboardShopSales />
      <DashboardShopSales />
      <DashboardShopSales />
      <DashboardShopSales />
    </View>
  )
}

export default DashBoardQueryResult
