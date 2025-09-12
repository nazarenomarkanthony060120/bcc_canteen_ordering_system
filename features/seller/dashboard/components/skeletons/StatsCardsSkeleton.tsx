import React from 'react'
import { View, Animated } from 'react-native'
import { BlurView } from 'expo-blur'
import SkeletonPlaceholder from '@/features/common/components/dashboard/components/skeletons/SkeletonPlaceholder'

const StatsCardsSkeleton = () => {
  return (
    <View className="flex-row justify-between mb-6">
      {/* My Stores Card Skeleton */}
      <View className="flex-1 mr-2">
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-2xl overflow-hidden"
        >
          <View className="bg-white/90 p-4 items-center">
            {/* Icon placeholder */}
            <View className="bg-emerald-100 p-3 rounded-full mb-2">
              <SkeletonPlaceholder width={24} height={24} borderRadius={4} />
            </View>
            {/* Number placeholder */}
            <SkeletonPlaceholder
              width={32}
              height={28}
              borderRadius={6}
              style={{ marginBottom: 4 }}
            />
            {/* Label placeholder */}
            <SkeletonPlaceholder width={60} height={14} borderRadius={6} />
          </View>
        </BlurView>
      </View>

      {/* Active Stores Card Skeleton */}
      <View className="flex-1 ml-2">
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-2xl overflow-hidden"
        >
          <View className="bg-white/90 p-4 items-center">
            {/* Icon placeholder */}
            <View className="bg-blue-100 p-3 rounded-full mb-2">
              <SkeletonPlaceholder width={24} height={24} borderRadius={4} />
            </View>
            {/* Number placeholder */}
            <SkeletonPlaceholder
              width={32}
              height={28}
              borderRadius={6}
              style={{ marginBottom: 4 }}
            />
            {/* Label placeholder */}
            <SkeletonPlaceholder width={40} height={14} borderRadius={6} />
          </View>
        </BlurView>
      </View>
    </View>
  )
}

export default StatsCardsSkeleton

