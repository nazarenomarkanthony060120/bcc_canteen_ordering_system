import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import SkeletonPlaceholder from '@/features/common/components/dashboard/components/skeletons/SkeletonPlaceholder'

const StoreListSkeleton = () => {
  return (
    <View className="mb-6">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-4">
        <SkeletonPlaceholder width={120} height={24} borderRadius={6} />
        <View className="flex-row items-center">
          <SkeletonPlaceholder
            width={100}
            height={16}
            borderRadius={6}
            style={{ marginRight: 4 }}
          />
          <SkeletonPlaceholder width={18} height={18} borderRadius={4} />
        </View>
      </View>

      {/* Store Cards Container */}
      <BlurView
        intensity={15}
        tint="light"
        className="rounded-3xl overflow-hidden"
      >
        <View className="bg-white/90 p-4">
          {/* Store Cards Skeleton */}
          {Array.from({ length: 3 }).map((_, index) => (
            <View
              key={index}
              className={`flex-row items-center p-4 rounded-2xl bg-white ${
                index < 2 ? 'mb-3' : ''
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              {/* Store Icon Placeholder */}
              <View className="bg-emerald-50 p-3 rounded-xl mr-4">
                <SkeletonPlaceholder width={28} height={28} borderRadius={4} />
              </View>

              {/* Store Info */}
              <View className="flex-1">
                {/* Store Name */}
                <SkeletonPlaceholder
                  width="80%"
                  height={18}
                  borderRadius={6}
                  style={{ marginBottom: 4 }}
                />
                {/* Store Address */}
                <SkeletonPlaceholder
                  width="60%"
                  height={14}
                  borderRadius={6}
                  style={{ marginBottom: 8 }}
                />
                {/* Status Badge */}
                <View className="bg-gray-100 px-3 py-1 rounded-full self-start">
                  <SkeletonPlaceholder
                    width={50}
                    height={12}
                    borderRadius={6}
                  />
                </View>
              </View>

              {/* Chevron Arrow */}
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
            </View>
          ))}
        </View>
      </BlurView>
    </View>
  )
}

export default StoreListSkeleton

