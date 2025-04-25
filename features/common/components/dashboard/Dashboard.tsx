import React from 'react'
import DashboardFormCard from './components/DashboardFormCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenLayout from '../screenLayout/ScreenLayout'

const Dashboard = () => {
  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-emerald-50">
        <DashboardFormCard />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default Dashboard
