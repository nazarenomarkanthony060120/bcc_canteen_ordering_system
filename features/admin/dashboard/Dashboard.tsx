import React from 'react'
import DashboardSearch from './components/dashboardSearch/DashboardSearch'
import DashBoardQueryResult from './components/dashboardSearch/dashboardQueryResult/DashBoardQueryResult'
import Layout from '../../common/Layout'

const Dashboard = () => {
  return (
    <Layout>
      <DashboardSearch>
        <DashBoardQueryResult />
      </DashboardSearch>
    </Layout>
  )
}

export default Dashboard
