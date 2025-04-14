import React from 'react'
import MyStoreFormHeader from './MyStoreFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, ScrollView, Text } from 'react-native'
import { Store } from '@/utils/types'
import MyStoreFormContents from './MyStoreFormContents'
import { useFetchFoodById } from '@/hooks/common/useFetchFoodByStoreId'

interface MyStoreFormCardProps {
  store: Store | null | undefined
}
const MyStoreFormCard = ({ store }: MyStoreFormCardProps) => {
  console.log(`test: ${JSON.stringify(store)}`)
  const {
    data: foods,
    isLoading,
    error,
  } = useFetchFoodById({
    id: store?.id,
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 p-5">
        <MyStoreFormHeader store={store?.store} />
        <Text>{error?.stack}sdf</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <MyStoreFormContents foods={foods} />
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

export default MyStoreFormCard
