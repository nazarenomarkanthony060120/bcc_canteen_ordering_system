import { View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import CategoryList from './component/CategoryList'
import { FlashList } from '@shopify/flash-list'
import Typo from '@/components/common/typo'
import { useFetchAllStoresByStatus } from '@/hooks/useQuery/common/fetch/useFetchAllStoresByStatus'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'

const StoreCategory = () => {
  const { data: stores, isFetching } = useFetchAllStoresByStatus()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
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

  if (isFetching) return null
  if (!stores || stores.length === 0) {
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="items-center justify-center p-4"
      >
        <BlurView intensity={10} className="rounded-2xl overflow-hidden">
          <View className="bg-white/90 p-6 items-center">
            <View className="bg-emerald-50 p-4 rounded-full mb-3">
              <MaterialIcons name="store" size={32} color="#10B981" />
            </View>
            <Typo className="text-gray-800 font-semibold text-lg mb-2">
              No Featured Stores
            </Typo>
            <Typo className="text-gray-500 text-sm text-center mb-3">
              There are currently no approved stores available. Check back later
              for updates.
            </Typo>
            <View className="bg-emerald-50 px-4 py-2 rounded-full">
              <Typo className="text-emerald-600 text-sm">Pull to refresh</Typo>
            </View>
          </View>
        </BlurView>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <BlurView intensity={10} className="rounded-2xl overflow-hidden">
        <View className="bg-white/90">
          <View style={{ height: 270 }}>
            <FlashList
              horizontal
              data={stores}
              estimatedItemSize={270}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CategoryList store={item} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 8 }}
            />
          </View>
        </View>
      </BlurView>
    </Animated.View>
  )
}

export default StoreCategory
