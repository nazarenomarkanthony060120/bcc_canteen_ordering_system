import { View, Text } from 'react-native'
import React from 'react'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { MasonryFlashList } from '@shopify/flash-list'

const StoreFormContents = () => {
  const { data: stores } = useFetchAllStores()

  return (
    <MasonryFlashList
      data={stores}
      estimatedItemSize={100}
      renderItem={({ item }) => (
        <View className="flex-1 bg-white m-2 p-4 rounded-lg shadow">
          <Text className="text-lg font-bold">{item.store}</Text>
          <Text className="text-gray-500">{item.address}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default StoreFormContents
