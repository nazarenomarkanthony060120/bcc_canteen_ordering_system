import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Seller from '../Seller'
import MyStoreFormCard from './component/MyStoreFormCard'
import MyStoreHeader from './component/MyStoreHeader'
import MyStoreFooter from './component/MyStoreFooter'
import { useGetStoreById } from '@/hooks/common/getStoreById'

interface MyStoreProps {
  params: URLSearchParams
}
const MyStore = ({ params }: MyStoreProps) => {
  const storeId = params.get('storeId')
  const { data: storeData, isLoading } = useGetStoreById({
    id: storeId,
  })

  return (
    <Seller className="flex-1 justify-between bg-[#ccffcc] px-5">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <MyStoreHeader />
          <MyStoreFormCard store={storeData} />
          <MyStoreFooter storeId={storeId} />
        </>
      )}
    </Seller>
  )
}

export default MyStore
