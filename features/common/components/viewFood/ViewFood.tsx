import React from 'react'
import { useGetFoodByFoodId } from '@/hooks/useQuery/common/get/useGetFoodByFoodId'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import ViewFoodHeader from './component/ViewFoodHeader'
import ViewFoodFormCard from './component/ViewFoodFormCard'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'

interface ViewFoodProps {
  params: URLSearchParams
}

const ViewFood = ({ params }: ViewFoodProps) => {
  const foodId = params.get('foodId')
  const { data: food } = useGetFoodByFoodId({ id: foodId })
  const { data: store, isFetching } = useGetStoreByStoreId({
    id: food?.storeId,
  })

  if (isFetching) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-emerald-200">
        <ViewFoodHeader />
        <ViewFoodFormCard food={food} store={store} />
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default ViewFood
