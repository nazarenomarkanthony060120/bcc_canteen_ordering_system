import React from 'react'
import DashboardSearch from './components/DashboardSearch'
import DashboardFormCard from './components/DashboardFormCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-900 justify-between">
      <DashboardSearch />
      <DashboardFormCard />
    </SafeAreaView>
  )
}

export default Dashboard
