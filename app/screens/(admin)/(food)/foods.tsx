import React from 'react'
import Foods from '@/features/dashboard/foods/Foods'
import { useSearchParams } from 'expo-router/build/hooks'

const FoodPage = () => {
  const params = useSearchParams()
  return <Foods params={params}/>
}

export default FoodPage