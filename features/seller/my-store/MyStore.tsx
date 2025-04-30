import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Seller from '../Seller'
import MyStoreFormCard from './component/MyStoreFormCard'
import MyStoreHeader from './component/MyStoreHeader'
import MyStoreFooter from './component/MyStoreFooter'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import Typo from '@/components/common/typo'

interface MyStoreProps {
  params: URLSearchParams
}

const MyStore = ({ params }: MyStoreProps) => {
  const storeId = params.get('storeId')
  const { data: storeData, isFetching } = useGetStoreByStoreId({
    id: storeId,
  })

  if (isFetching)
    return (
      <>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Typo>Loading</Typo>
        </View>
      </>
    )

  return (
    <Seller className="flex-1 justify-between bg-[#ccffcc]">
      <MyStoreHeader />
      <MyStoreFormCard store={storeData} />
      <MyStoreFooter storeId={storeId} />
    </Seller>
  )
}

export default MyStore
