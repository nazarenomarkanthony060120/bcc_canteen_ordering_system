import { ActivityIndicator, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryList from './component/CategoryList'
import { useFetchAllStores } from '@/hooks/common/useFetchAllStores'
import { FlashList } from '@shopify/flash-list'

const StoreCategory = () => {
  const { data: stores, isFetching } = useFetchAllStores()
  return (
    <SafeAreaView className="gap-2 pb-5">
      <Text className="text-lg font-semibold">Stores</Text>
      {isFetching ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlashList
          data={stores}
          renderItem={({ item }) => <CategoryList store={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}

export default StoreCategory
