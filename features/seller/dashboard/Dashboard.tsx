import React from 'react'
import Seller from '../Seller'
import DashboardSearch from './components/DashboardSearch'
import DashboardFormCard from './components/DashboardFormCard'

const Dashboard = () => {
  return (
    <Seller className="flex-1 bg-slate-900 justify-between">
      <DashboardSearch />
      <DashboardFormCard />
    </Seller>
  )
}

export default Dashboard
