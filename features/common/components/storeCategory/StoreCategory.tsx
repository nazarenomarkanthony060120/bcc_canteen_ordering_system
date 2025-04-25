import { ActivityIndicator, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryList from './component/CategoryList'
import { FlashList } from '@shopify/flash-list'
import Typo from '@/components/common/typo'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import ScreenLayout from '../screenLayout/ScreenLayout'

const StoreCategory = () => {
  const { data: stores, isFetching } = useFetchAllStores()

  let content = <ActivityIndicator size="large" color="#0000ff" />
  if (isFetching) {
    content = (
      <>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Typo>Loading</Typo>
        </View>
      </>
    )
  } else if (stores?.length == 0) {
    content = <Typo>No Stores for today!.</Typo>
  } else {
    content = (
      <View style={{ height: 100 }}>
        <FlashList
          data={stores}
          horizontal
          renderItem={({ item }) => <CategoryList store={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }

  return (
    <ScreenLayout>
      <SafeAreaView className="gap-2">
        <Text className="text-lg font-semibold">Stores</Text>
        {content}
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default StoreCategory
