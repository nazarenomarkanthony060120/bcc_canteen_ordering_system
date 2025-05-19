import { Text } from 'react-native'
import React from 'react'
import ScreenLayout from '@/features/common/components/screenLayout/ScreenLayout'
import StoresHeader from './component/StoresHeader'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { MasonryFlashList } from '@shopify/flash-list'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

const Stores = () => {
  const { data: stores, isLoading } = useFetchAllStores()

  if (isLoading) return <LoadingIndicator />
  
  return (
    <ScreenLayout>
      <StoresHeader />
      <MasonryFlashList
        data={stores}
        estimatedItemSize={200}
        renderItem={({ item }) => <Text>{item.store}</Text>}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No stores found</Text>}
        refreshing={isLoading}
      />
      <Text>Stores</Text>
    </ScreenLayout>
  )
}

export default Stores
