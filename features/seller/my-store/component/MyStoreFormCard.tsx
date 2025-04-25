import React from 'react'
import MyStoreFormHeader from './MyStoreFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { Store } from '@/utils/types'
import MyStoreFormContents from './MyStoreFormContents'
import { FlashList } from '@shopify/flash-list'
import Typo from '@/components/common/typo'
import { useFetchFoodByStoreId } from '@/hooks/useQuery/common/get/useFetchFoodByStoreId'

interface MyStoreFormCardProps {
  store: Store | null | undefined
}
const MyStoreFormCard = ({ store }: MyStoreFormCardProps) => {
  const {
    data: foods,
    isFetching,
    error,
  } = useFetchFoodByStoreId({
    id: store?.id,
  })

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = <ActivityIndicator size="large" color="#0000ff" />
  } else if (foods?.length === 0) {
    content = <Typo>You Don't have any foods yet.</Typo>
  } else {
    content = (
      <FlashList
        data={foods}
        renderItem={({ item }) => <MyStoreFormContents food={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View className="h-2" />}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <MyStoreFormHeader store={store?.store} />
        <Text>{error?.stack}</Text>
        {content}
      </SafeAreaView>
    </ScrollView>
  )
}

export default MyStoreFormCard
