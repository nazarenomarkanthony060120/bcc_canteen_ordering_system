import React from 'react'
import MyStoreFormHeader from './MyStoreFormHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, View } from 'react-native'
import { Store } from '@/utils/types'
import MyStoreFormContents from './MyStoreFormContents'
import { MasonryFlashList } from '@shopify/flash-list'
import Typo from '@/components/common/typo'
import { useFetchFoodByStoreId } from '@/hooks/useQuery/common/get/useFetchFoodByStoreId'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import MyStoreFooter from './MyStoreFooter'
import MenuOfTheDay from './MenuOfTheDay'

interface MyStoreFormCardProps {
  store: Store | null | undefined
}

const MyStoreFormCard = ({ store }: MyStoreFormCardProps) => {
  const router = useRouter()
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
      <SafeAreaView className="flex-1">
        <MyStoreFormHeader store={store} />
        <LinearGradient
          colors={['#f0fdf4', '#ecfdf5', '#d1fae5']}
          className="flex-1"
        >
          <View className="flex-1 items-center justify-center px-6 py-12">
            <BlurView
              intensity={20}
              tint="light"
              className="rounded-3xl overflow-hidden w-full max-w-sm"
            >
              <View className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/30">
                <View className="items-center mb-6">
                  <View className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-full mb-4 shadow-sm">
                    <MaterialIcons
                      name="restaurant"
                      size={48}
                      color="#10B981"
                    />
                  </View>
                  <Typo className="text-gray-800 text-2xl font-bold mb-2 text-center">
                    No Foods Found
                  </Typo>
                  <Typo className="text-gray-500 text-center text-base leading-6">
                    You haven't added any foods to your store yet.{'\n'}Start by
                    adding your first food item.
                  </Typo>
                </View>

                <View className="bg-gradient-to-br from-emerald-50/80 to-emerald-100/80 p-4 rounded-2xl border border-emerald-100/50">
                  <View className="flex-row items-center gap-3 mb-3">
                    <View className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-2 rounded-full shadow-sm">
                      <MaterialIcons name="info" size={20} color="#10B981" />
                    </View>
                    <Typo className="text-emerald-800 font-medium flex-1">
                      Tips for Adding Foods
                    </Typo>
                  </View>
                  <View className="space-y-2">
                    <View className="flex-row items-center gap-2">
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color="#10B981"
                      />
                      <Typo className="text-emerald-700 text-sm">
                        Add clear, appetizing photos
                      </Typo>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color="#10B981"
                      />
                      <Typo className="text-emerald-700 text-sm">
                        Set competitive prices
                      </Typo>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color="#10B981"
                      />
                      <Typo className="text-emerald-700 text-sm">
                        Write detailed descriptions
                      </Typo>
                    </View>
                  </View>
                </View>
              </View>
            </BlurView>
          </View>
        </LinearGradient>
        <MyStoreFooter storeId={store?.id ?? null} />
      </SafeAreaView>
    )

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2">
        <MyStoreFormHeader store={store} />
        <MenuOfTheDay />
        <View className="flex-row justify-center items-center gap-2 py-2">
          <MaterialIcons name="restaurant-menu" size={24} color="#667eea" />
          <Typo className="text-gray-800 text-lg font-semibold">All Foods</Typo>
        </View>
        <MasonryFlashList
          data={foods}
          estimatedItemSize={500}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <MyStoreFormContents food={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
        <MyStoreFooter storeId={store?.id ?? null} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default MyStoreFormCard
