import { RefreshControl, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Seller from '../Seller'
import NoStore from './component/NoStore'
import { useAuth } from '@/context/auth'
import StoreListFormCard from './component/StoreListFormCard'
import StoreHeader from './component/StoreHeader'
import StoreFooter from './component/StoreFooter'
import { useFetchStoreByUserId } from '@/hooks/useQuery/common/fetch/useFetchStoreByUserId'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

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

  if (isLoading) return <LoadingIndicator />
  if (!storeData || storeData.length === 0) return <NoStore />

  return (
    <Seller className="flex-1 bg-white px-7 py-3">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <StoreHeader />
        <StoreListFormCard stores={storeData} />
      </ScrollView>
      {storeData && storeData.length > 0 && !isLoading && <StoreFooter />}
    </Seller>
  )
}

export default Store
