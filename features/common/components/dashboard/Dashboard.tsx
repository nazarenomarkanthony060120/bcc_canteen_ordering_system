import React from 'react'
import DashboardFormCard from './components/DashboardFormCard'
import { SafeAreaView } from 'react-native-safe-area-context'

const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-emerald-50">
      <DashboardFormCard />
    </SafeAreaView>
  )
}

export default Dashboard
