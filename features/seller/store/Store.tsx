// Store.tsx

import { ActivityIndicator } from 'react-native'
import React from 'react'
import Seller from '../Seller'
import NoStore from './component/NoStore'
import { useAuth } from '@/context/auth'
import { useFetchStoreById } from '@/hooks/common/fetchStoreById'
import StoreListFormCard from './component/StoreListFormCard'
import StoreHeader from './component/StoreHeader'
import StoreFooter from './component/StoreFooter'

const Store = () => {
  const auth = useAuth()
  const { data: storeData, isLoading } = useFetchStoreById({
    id: auth.user?.uid,
  })

  let content = <ActivityIndicator />

  if (isLoading) {
    content = <ActivityIndicator />
  } else if (!storeData || storeData.length === 0) {
    content = <NoStore />
  } else {
    content = (
      <>
        <StoreHeader />
        <StoreListFormCard stores={storeData} />
        <StoreFooter />
      </>
    )
  }

  return (
    <Seller className="flex-1 justify-between bg-white px-7 py-3">
      {content}
    </Seller>
  )
}

export default Store
