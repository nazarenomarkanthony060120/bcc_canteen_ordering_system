import React, { useRef, useEffect } from 'react'
import { View, Animated, ScrollView, RefreshControl } from 'react-native'
import Seller from '../Seller'
import MyStoreFormCard from './component/MyStoreFormCard'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { useState } from 'react'
import MyStoreHeader from './component/MyStoreHeader'
import ViewAnalyticsCard from './component/ViewAnalyticsCard'

interface MyStoreProps {
  params: URLSearchParams
}

const MyStore = ({ params }: MyStoreProps) => {
  const storeId = params.get('storeId')
  const {
    data: storeData,
    isLoading,
    refetch,
  } = useGetStoreByStoreId({
    id: storeId,
  })
  const [refreshing, setRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  useEffect(() => {
    if (!isLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isLoading])

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }

  if (isLoading) return <LoadingIndicator />

  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#10B981"
            colors={['#10B981']}
            progressBackgroundColor="#ffffff"
          />
        }
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          }}
          className="flex-1"
        >
          <View className="p-4">
            <BlurView
              intensity={20}
              tint="light"
              className="rounded-3xl overflow-hidden mb-4 gap-2"
            >
              <MyStoreHeader
                storeId={storeData?.id}
                status={storeData?.status}
              />
              <ViewAnalyticsCard storeId={storeData?.id} />
              <View className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm overflow-hidden border border-white/30">
                <MyStoreFormCard store={storeData} />
              </View>
            </BlurView>
          </View>
        </Animated.View>
      </ScrollView>
    </Seller>
  )
}

export default MyStore
