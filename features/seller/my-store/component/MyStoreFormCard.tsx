import React from 'react'
import MyStoreFormHeader from './MyStoreFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text } from 'react-native'
import { Store } from '@/utils/types'
import MyStoreFormContents from './MyStoreFormContents'
import { MasonryFlashList } from '@shopify/flash-list'
import Typo from '@/components/common/typo'
import { useFetchFoodByStoreId } from '@/hooks/useQuery/common/get/useFetchFoodByStoreId'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

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

  if (isFetching) return <LoadingIndicator />
  if (foods?.length === 0)
    return (
      <SafeAreaView className="gap-2">
        <MyStoreFormHeader store={store?.store} />
        <Typo>You Don't have any foods yet.</Typo>
      </SafeAreaView>
    )

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <MyStoreFormHeader store={store?.store} />
        <Text>{error?.stack}</Text>
        <MasonryFlashList
          data={foods}
          estimatedItemSize={500}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <MyStoreFormContents food={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </ScrollView>
  )
}

export default MyStoreFormCard
