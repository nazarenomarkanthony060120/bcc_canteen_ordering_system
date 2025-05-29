import React, { useState } from 'react'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import ViewStoreHeader from './component/ViewStoreHeader'
import ViewStoreFormCard from './component/ViewStoreFormCard'
import { useFetchFoodByStoreId } from '@/hooks/useQuery/common/get/useFetchFoodByStoreId'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, RefreshControl } from 'react-native'
import ViewAnalyticsCard from '@/features/seller/my-store/component/ViewAnalyticsCard'
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { UserType } from '@/utils/types'
import { View } from 'react-native'

interface ViewStoreProps {
  params: URLSearchParams
}

const ViewStore = ({ params }: ViewStoreProps) => {
  const [refreshing, setRefreshing] = useState(false)
  const storeId = params.get('storeId')
  const auth = useAuth()
  const { data: user} = useGetUserByUserId({ id: auth.user?.uid })
  const { data: store, refetch: refetchStore } = useGetStoreByStoreId({
    id: storeId,
  })
  const {
    data: foods,
    isFetching,
    refetch: refetchFoods,
  } = useFetchFoodByStoreId({ id: store?.id })

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await Promise.all([refetchStore(), refetchFoods()])
    } finally {
      setRefreshing(false)
    }
  }

  if (isFetching && !refreshing) return <LoadingIndicator />

  return (
    <ScreenLayout>
      <LinearGradient
        colors={['#E0F2FE', '#F0F9FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <ViewStoreHeader />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View className='p-4'>
            { user?.type === UserType.ADMIN && <ViewAnalyticsCard storeId={store?.id} />}
            </View>
            <ViewStoreFormCard foods={foods} store={store} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ScreenLayout>
  )
}

export default ViewStore
