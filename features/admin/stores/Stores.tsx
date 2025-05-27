import { ScrollView, Text, View, RefreshControl, Animated } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import StoresHeader from './component/StoresHeader'
import { useFetchAllStores } from '@/hooks/useQuery/common/fetch/useFetchAllStores'
import { MasonryFlashList } from '@shopify/flash-list'
import StoresList from './component/StoresList'
import Admin from '../Admin'
import { LinearGradient } from 'expo-linear-gradient'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { MaterialIcons } from '@expo/vector-icons'

const Stores = () => {
  const { data: stores, isLoading, refetch } = useFetchAllStores()
  const [refreshing, setRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      refetch()
    }, 2000)
  }, [])

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  if (isLoading && !refreshing) return <LoadingIndicator />

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <Admin className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="p-5"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#ffffff"
              colors={['#ffffff']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <StoresHeader />
            <View className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30 ">
              <MasonryFlashList
                data={stores}
                estimatedItemSize={200}
                renderItem={({ item }) => <StoresList store={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View className="p-8 items-center">
                    <MaterialIcons name="store" size={48} color="#9CA3AF" />
                    <Text className="text-gray-500 text-lg mt-2">
                      No stores found
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">
                      Pull down to refresh
                    </Text>
                  </View>
                }
                refreshing={refreshing}
                contentContainerStyle={{ padding: 16 }}
              />
            </View>
          </Animated.View>
        </ScrollView>
      </Admin>
    </LinearGradient>
  )
}

export default Stores
