import React, { useRef, useEffect } from 'react'
import { View, ScrollView, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import Seller from '@/features/seller/Seller'
import DashboardHeaderSkeleton from '@/features/common/components/dashboard/components/skeletons/DashboardHeaderSkeleton'
import StatsCardsSkeleton from './StatsCardsSkeleton'
import StoreListSkeleton from './StoreListSkeleton'
import SkeletonPlaceholder from '@/features/common/components/dashboard/components/skeletons/SkeletonPlaceholder'

const SellerDashboardSkeleton = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1"
          >
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              {/* Dashboard Header Skeleton */}
              <DashboardHeaderSkeleton />

              <View className="p-6">
                {/* Page Header Skeleton */}
                <View className="mb-8">
                  <SkeletonPlaceholder
                    width={140}
                    height={32}
                    borderRadius={8}
                    style={{ marginBottom: 8 }}
                  />
                  <SkeletonPlaceholder
                    width={280}
                    height={16}
                    borderRadius={6}
                  />
                </View>

                {/* Stats Cards Skeleton */}
                <Animated.View
                  style={{
                    transform: [{ scale: scaleAnim }],
                  }}
                >
                  <StatsCardsSkeleton />
                </Animated.View>

                {/* Store List Skeleton */}
                <StoreListSkeleton />

                {/* Browse All Stores Button Skeleton */}
                <View className="mb-6">
                  <BlurView
                    intensity={20}
                    tint="light"
                    className="rounded-2xl overflow-hidden"
                  >
                    <View className="bg-emerald-500 p-4">
                      <View className="flex-row items-center justify-center">
                        <SkeletonPlaceholder
                          width={24}
                          height={24}
                          borderRadius={4}
                          style={{ marginRight: 12 }}
                        />
                        <SkeletonPlaceholder
                          width={150}
                          height={18}
                          borderRadius={6}
                          style={{ marginRight: 12 }}
                        />
                        <SkeletonPlaceholder
                          width={24}
                          height={24}
                          borderRadius={4}
                        />
                      </View>
                    </View>
                  </BlurView>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </Seller>
  )
}

export default SellerDashboardSkeleton
