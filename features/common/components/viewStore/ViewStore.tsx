import React from 'react'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import { ActivityIndicator, View } from 'react-native'
import ViewStoreHeader from './component/ViewStoreHeader'
import ViewStoreFormCard from './component/ViewStoreFormCard'
import { useFetchFoodByStoreId } from '@/hooks/useQuery/common/get/useFetchFoodByStoreId'

interface ViewStoreProps {
  params: URLSearchParams
}

const ViewStore = ({ params }: ViewStoreProps) => {
  const storeId = params.get('storeId')
  const { data: store } = useGetStoreByStoreId({ id: storeId })
  const { data: foods, isFetching } = useFetchFoodByStoreId({ id: store?.id })

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
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-emerald-50">
        <ViewStoreHeader />
        <ViewStoreFormCard foods={foods} store={store} />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default ViewStore
