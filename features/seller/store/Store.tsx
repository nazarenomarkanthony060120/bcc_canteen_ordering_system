import { RefreshControl, ScrollView, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Seller from '../Seller'
import NoStore from './component/NoStore'
import { useAuth } from '@/context/auth'
import StoreListFormCard from './component/StoreListFormCard'
import StoreHeader from './component/StoreHeader'
import StoreFooter from './component/StoreFooter'
import { useFetchStoreByUserId } from '@/hooks/useQuery/common/fetch/useFetchStoreByUserId'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { Animated } from 'react-native'
import { BlurView } from 'expo-blur'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { UserKYCStatus } from '@/utils/types'
import NoKYC from './component/NoKYC'

const Store = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  const auth = useAuth()
  const { data: user, refetch: refetchUser } = useGetUserByUserId({
    id: auth.user?.uid,
  })

  const {
    data: storeData,
    isLoading,
    refetch,
  } = useFetchStoreByUserId({
    id: auth.user?.uid,
  })

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
    setIsRefreshing(true)
    await refetch()
    await refetchUser()
    setIsRefreshing(false)
  }

  if (isLoading) return <LoadingIndicator />
  if (user?.status === UserKYCStatus.APPLIED)
    return <NoKYC onRefresh={onRefresh} />
  if (!storeData || storeData.length === 0)
    return <NoStore onRefresh={onRefresh} />

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
        className="flex-1 px-6"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
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
        >
          <StoreHeader />
          <BlurView
            intensity={20}
            tint="light"
            className="rounded-3xl overflow-hidden"
          >
            <View className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm overflow-hidden border border-white/30">
              <StoreListFormCard stores={storeData} user={user} />
            </View>
          </BlurView>
        </Animated.View>
      </ScrollView>
      {storeData && storeData.length > 0 && !isLoading && <StoreFooter />}
    </Seller>
  )
}

export default Store
