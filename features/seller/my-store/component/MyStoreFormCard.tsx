import React from 'react'
import MyStoreFormHeader from './MyStoreFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { Store } from '@/utils/types'
import MyStoreFormContents from './MyStoreFormContents'
import { useFetchFoodById } from '@/hooks/common/useFetchFoodByStoreId'
import { FlashList } from '@shopify/flash-list'

interface MyStoreFormCardProps {
  store: Store | null | undefined
}
const MyStoreFormCard = ({ store }: MyStoreFormCardProps) => {
  const {
    data: foods,
    isFetching,
    error,
  } = useFetchFoodById({
    id: store?.id,
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <MyStoreFormHeader store={store?.store} />
        <Text>{error?.stack}</Text>
        {isFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlashList
            data={foods}
            renderItem={({ item }) => <MyStoreFormContents food={item} />}
            keyExtractor={(item) => item.id}
            estimatedItemSize={100}
            ItemSeparatorComponent={() => <View className="h-2" />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

export default MyStoreFormCard
