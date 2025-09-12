import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from '@/features/common/components/dashboard/components/skeletons/SkeletonPlaceholder'

const AdminStatsSkeleton = () => {
  return (
    <View className="mb-6 bg-black/70 rounded-3xl p-4">
      {/* Header */}
      <View className="flex-row items-center gap-3 mb-2">
        <SkeletonPlaceholder width={28} height={28} borderRadius={6} />
        <SkeletonPlaceholder width={180} height={32} borderRadius={8} />
      </View>

      {/* Subtitle */}
      <SkeletonPlaceholder
        width={320}
        height={16}
        borderRadius={6}
        style={{ marginBottom: 16 }}
      />

      {/* Stats Cards */}
      <View className="flex-col gap-3">
        {/* First Row */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white/10 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
              <SkeletonPlaceholder width={80} height={14} borderRadius={6} />
            </View>
            <SkeletonPlaceholder width={32} height={32} borderRadius={8} />
          </View>

          <View className="flex-1 bg-white/10 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
              <SkeletonPlaceholder width={70} height={14} borderRadius={6} />
            </View>
            <SkeletonPlaceholder width={32} height={32} borderRadius={8} />
          </View>
        </View>

        {/* Second Row */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white/10 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
              <SkeletonPlaceholder width={60} height={14} borderRadius={6} />
            </View>
            <SkeletonPlaceholder width={32} height={32} borderRadius={8} />
          </View>

          <View className="flex-1 bg-white/10 rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
              <SkeletonPlaceholder width={65} height={14} borderRadius={6} />
            </View>
            <SkeletonPlaceholder width={32} height={32} borderRadius={8} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default AdminStatsSkeleton

