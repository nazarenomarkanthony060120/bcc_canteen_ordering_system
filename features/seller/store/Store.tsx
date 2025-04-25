import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native'
import React, { useState } from 'react'
import Seller from '../Seller'
import NoStore from './component/NoStore'
import { useAuth } from '@/context/auth'
import StoreListFormCard from './component/StoreListFormCard'
import StoreHeader from './component/StoreHeader'
import StoreFooter from './component/StoreFooter'
import { useFetchStoreByUserId } from '@/hooks/useQuery/common/fetch/useFetchStoreByUserId'
import Typo from '@/components/common/typo'

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
    content = (
      <>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Typo>Loading</Typo>
        </View>
      </>
    )
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
