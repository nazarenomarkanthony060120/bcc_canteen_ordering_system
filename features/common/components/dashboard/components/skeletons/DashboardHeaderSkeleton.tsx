import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import SkeletonPlaceholder from './SkeletonPlaceholder'

const DashboardHeaderSkeleton = () => {
  return (
    <BlurView intensity={10} className="rounded-3xl overflow-hidden mb-6">
      <View className="bg-white/90 px-2 py-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            {/* Profile image skeleton */}
            <View className="bg-emerald-100 p-1 rounded-full mr-3 overflow-hidden">
              <SkeletonPlaceholder width={40} height={40} borderRadius={20} />
            </View>

            {/* User info skeleton */}
            <View className="mr-2">
              <SkeletonPlaceholder
                width={80}
                height={12}
                borderRadius={6}
                style={{ marginBottom: 4 }}
              />
              <SkeletonPlaceholder width={120} height={20} borderRadius={6} />
            </View>
          </View>

          {/* Header icons skeleton */}
          <View className="flex-row items-center">
            <SkeletonPlaceholder
              width={40}
              height={40}
              borderRadius={20}
              style={{ marginRight: 8 }}
            />
            <SkeletonPlaceholder width={40} height={40} borderRadius={20} />
          </View>
        </View>
      </View>
    </BlurView>
  )
}

export default DashboardHeaderSkeleton

