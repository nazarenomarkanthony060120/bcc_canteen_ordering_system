import React from 'react'
import ViewStore from '@/features/common/components/viewStore/ViewStore'
import { useSearchParams } from 'expo-router/build/hooks'

const ViewStoreScreen = () => {
  const params = useSearchParams()
  return <ViewStore params={params} />
}

export default ViewStoreScreen
