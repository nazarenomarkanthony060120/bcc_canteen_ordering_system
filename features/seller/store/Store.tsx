import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Seller from '../Seller'
import NoStore from './component/NoStore'
import { useAuth } from '@/context/auth'
import { useFetchStoreByUserId } from '@/hooks/common/useQuery/useFetchStoreByUserId'
import StoreListFormCard from './component/StoreListFormCard'
import StoreHeader from './component/StoreHeader'
import StoreFooter from './component/StoreFooter'

const Store = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const auth = useAuth()
  const {
    data: storeData,
    isLoading,
    refetch,
  } = useFetchStoreByUserId({
    id: auth.user?.uid,
  })

  const onRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }

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
      </>
    )
  }

  return (
    <Seller className="flex-1 bg-white px-7 py-3">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {content}
      </ScrollView>
      {storeData && storeData.length > 0 && !isLoading && <StoreFooter />}
    </Seller>
  )
}

export default Store
