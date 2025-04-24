import React from 'react'
import ViewFood from '@/features/common/components/viewFood/ViewFood'
import { useSearchParams } from 'expo-router/build/hooks'

const ViewFoodScreen = () => {
  const param = useSearchParams()
  return <ViewFood />
}

export default ViewFoodScreen
