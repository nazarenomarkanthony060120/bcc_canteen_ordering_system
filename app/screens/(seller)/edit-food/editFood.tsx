import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks'
import EditFood from '@/features/seller/edit-food/EditFood'

const EditFoodScreen = () => {
  const params = useSearchParams()

  return <EditFood params={params} />
}

export default EditFoodScreen

