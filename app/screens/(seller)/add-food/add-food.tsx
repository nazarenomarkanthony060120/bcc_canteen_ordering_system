import React from 'react'
import AddFood from '@/features/seller/add-food/AddFood'
import { useSearchParams } from 'expo-router/build/hooks'

const addFoodScreen = () => {
  const params = useSearchParams()
  return <AddFood params={params} />
}

export default addFoodScreen
