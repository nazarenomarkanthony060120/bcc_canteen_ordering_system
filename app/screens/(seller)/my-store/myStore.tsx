import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks'
import MyStore from '@/features/seller/my-store/MyStore'

const MyStoreScreen = () => {
  const params = useSearchParams()

  return <MyStore params={params} />
}

export default MyStoreScreen
