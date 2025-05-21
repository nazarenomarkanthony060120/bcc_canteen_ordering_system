import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import StoresHeader from './component/StoresHeader'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { MasonryFlashList } from '@shopify/flash-list'
import StoresList from './component/StoresList'
import Admin from '../Admin'
import { LinearGradient } from 'expo-linear-gradient'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

const Stores = () => {
  const { data: stores, isLoading } = useFetchAllStores()

  if (isLoading) return <LoadingIndicator />

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <Admin className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="p-5 mb-16">
          <StoresHeader />
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30">
            <MasonryFlashList
              data={stores}
              estimatedItemSize={200}
              renderItem={({ item }) => <StoresList store={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View className="p-8 items-center">
                  <Text className="text-gray-500 text-lg">No stores found</Text>
                </View>
              }
              refreshing={isLoading}
              contentContainerStyle={{ padding: 16 }}
            />
          </View>
        </ScrollView>
      </Admin>
    </LinearGradient>
  )
}

export default Stores
