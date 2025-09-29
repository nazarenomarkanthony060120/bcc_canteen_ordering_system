import React, { useRef, useEffect } from 'react'
import { ScrollView, Animated, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import Admin from '@/features/admin/Admin'
import DashboardHeaderSkeleton from '@/features/common/components/dashboard/components/skeletons/DashboardHeaderSkeleton'
import AdminStatsSkeleton from './AdminStatsSkeleton'
import SellerCardSkeleton from './SellerCardSkeleton'
import SkeletonPlaceholder from '@/features/common/components/dashboard/components/skeletons/SkeletonPlaceholder'

const AdminDashboardSkeleton = () => {
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

  return (
    <Admin className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false} className="p-5">
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Dashboard Header Skeleton */}
              <DashboardHeaderSkeleton />

              {/* Admin Stats Header Skeleton */}
              <AdminStatsSkeleton />

              {/* Create Seller Account Button Skeleton */}
              <View
                className="rounded-2xl mb-4 shadow-lg"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <View className="flex-row bg-green-500 rounded-lg items-center justify-center gap-3 p-4">
                  <View className="bg-white/15 p-2 rounded-full backdrop-blur-sm">
                    <SkeletonPlaceholder
                      width={20}
                      height={20}
                      borderRadius={4}
                    />
                  </View>
                  <SkeletonPlaceholder
                    width={160}
                    height={16}
                    borderRadius={6}
                  />
                  <SkeletonPlaceholder
                    width={18}
                    height={18}
                    borderRadius={4}
                  />
                </View>
              </View>

              {/* Seller Information Section */}
              <View className="backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30">
                <View className="p-4">
                  {/* Section Header */}
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center gap-3">
                      <SkeletonPlaceholder
                        width={24}
                        height={24}
                        borderRadius={4}
                      />
                      <SkeletonPlaceholder
                        width={150}
                        height={24}
                        borderRadius={6}
                      />
                    </View>
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                      <SkeletonPlaceholder
                        width={60}
                        height={14}
                        borderRadius={6}
                      />
                    </View>
                  </View>

                  {/* Seller Cards Skeleton */}
                  <View style={{ minHeight: 200 }}>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <SellerCardSkeleton key={index} />
                    ))}
                  </View>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Admin>
  )
}

export default AdminDashboardSkeleton



