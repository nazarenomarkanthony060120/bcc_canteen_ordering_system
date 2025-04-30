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

  if (isFetching)
    return (
      <>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Typo>Loading</Typo>
        </View>
      </>
    )
  if (stores?.length == 0) return <Typo>No Stores for today!.</Typo>

  return (
    <ScreenLayout>
      <SafeAreaView className="gap-2">
        <Text className="text-lg font-semibold">Stores</Text>
        <View style={{ height: 100 }}>
          <FlashList
            horizontal
            data={stores}
            estimatedItemSize={136}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CategoryList store={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default StoreCategory
