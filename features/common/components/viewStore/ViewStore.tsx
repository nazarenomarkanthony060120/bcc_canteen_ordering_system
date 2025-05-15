import React from 'react'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import ViewStoreHeader from './component/ViewStoreHeader'
import ViewStoreFormCard from './component/ViewStoreFormCard'
import { useFetchFoodByStoreId } from '@/hooks/useQuery/common/get/useFetchFoodByStoreId'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'

interface ViewStoreProps {
  params: URLSearchParams
}

const ViewStore = ({ params }: ViewStoreProps) => {
  const storeId = params.get('storeId')
  const { data: store } = useGetStoreByStoreId({ id: storeId })
  const { data: foods, isFetching } = useFetchFoodByStoreId({ id: store?.id })

  if (isFetching) return <LoadingIndicator />

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
