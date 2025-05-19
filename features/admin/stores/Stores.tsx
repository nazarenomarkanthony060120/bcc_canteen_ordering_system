import { ScrollView, Text } from 'react-native'
import React from 'react'
import StoresHeader from './component/StoresHeader'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { MasonryFlashList } from '@shopify/flash-list'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import StoresList from './component/StoresList'
import Admin from '../Admin'

const Stores = () => {
  const { data: stores, isLoading } = useFetchAllStores()

  if (isLoading) return <LoadingIndicator />

  return (
    <Admin className=" flex-1 bg-[#ccffcc]">
      <ScrollView showsVerticalScrollIndicator={false} className="p-5 mb-16">
        <StoresHeader />
        <MasonryFlashList
          data={stores}
          estimatedItemSize={200}
          renderItem={({ item }) => <StoresList store={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>No stores found</Text>}
          refreshing={isLoading}
        />
      </ScrollView>
    </Admin>
  )
}

export default Stores
