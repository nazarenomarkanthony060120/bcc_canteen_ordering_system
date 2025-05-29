import React from 'react'
import ViewAnalytics from '@/features/seller/view-analytics/ViewAnalytics'
import { useSearchParams } from 'expo-router/build/hooks'

const ViewAnalyticsScreen = () => {
    const params = useSearchParams()
  return <ViewAnalytics storeId={params.get('storeId')}/>
}

export default ViewAnalyticsScreen