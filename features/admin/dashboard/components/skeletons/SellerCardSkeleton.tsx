import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from '@/features/common/components/dashboard/components/skeletons/SkeletonPlaceholder'

const SellerCardSkeleton = () => {
  return (
    <View
      className="bg-white/95 backdrop-blur-lg rounded-3xl mb-4 overflow-hidden border border-white/30"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="p-6">
        {/* Header with avatar and basic info */}
        <View className="flex-row items-center mb-4">
          <View className="mr-4">
            <View className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              <SkeletonPlaceholder width={64} height={64} borderRadius={32} />
            </View>
          </View>
          <View className="flex-1">
            {/* Name */}
            <SkeletonPlaceholder
              width="80%"
              height={24}
              borderRadius={6}
              style={{ marginBottom: 4 }}
            />
            {/* Email */}
            <SkeletonPlaceholder
              width="70%"
              height={14}
              borderRadius={6}
              style={{ marginBottom: 8 }}
            />
            {/* Status Badge */}
            <View className="bg-gray-100 px-3 py-1.5 rounded-full w-28">
              <View className="flex-row items-center">
                <SkeletonPlaceholder
                  width={14}
                  height={14}
                  borderRadius={4}
                  style={{ marginRight: 6 }}
                />
                <SkeletonPlaceholder width={50} height={14} borderRadius={6} />
              </View>
            </View>
          </View>
        </View>

        {/* Seller Details */}
        <View className="space-y-3 gap-3">
          {/* Seller ID */}
          <View className="flex-row items-center gap-3">
            <View className="bg-blue-50 p-2 rounded-full">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
            </View>
            <View className="flex-1">
              <SkeletonPlaceholder
                width={60}
                height={14}
                borderRadius={6}
                style={{ marginBottom: 4 }}
              />
              <SkeletonPlaceholder width="90%" height={16} borderRadius={6} />
            </View>
          </View>

          {/* Account Type */}
          <View className="flex-row items-center gap-3">
            <View className="bg-purple-50 p-2 rounded-full">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
            </View>
            <View className="flex-1">
              <SkeletonPlaceholder
                width={80}
                height={14}
                borderRadius={6}
                style={{ marginBottom: 4 }}
              />
              <SkeletonPlaceholder width={50} height={16} borderRadius={6} />
            </View>
          </View>

          {/* Address */}
          <View className="flex-row items-center gap-3">
            <View className="bg-green-50 p-2 rounded-full">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
            </View>
            <View className="flex-1">
              <SkeletonPlaceholder
                width={60}
                height={14}
                borderRadius={6}
                style={{ marginBottom: 4 }}
              />
              <SkeletonPlaceholder width="85%" height={16} borderRadius={6} />
            </View>
          </View>

          {/* Date Registered */}
          <View className="flex-row items-center gap-3">
            <View className="bg-amber-50 p-2 rounded-full">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
            </View>
            <View className="flex-1">
              <SkeletonPlaceholder
                width={90}
                height={14}
                borderRadius={6}
                style={{ marginBottom: 4 }}
              />
              <SkeletonPlaceholder width={120} height={16} borderRadius={6} />
            </View>
          </View>

          {/* Last Updated */}
          <View className="flex-row items-center gap-3">
            <View className="bg-indigo-50 p-2 rounded-full">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
            </View>
            <View className="flex-1">
              <SkeletonPlaceholder
                width={80}
                height={14}
                borderRadius={6}
                style={{ marginBottom: 4 }}
              />
              <SkeletonPlaceholder width={110} height={16} borderRadius={6} />
            </View>
          </View>
        </View>

        {/* Store Information */}
        <View className="mt-4 pt-4 border-t border-gray-200">
          <View className="flex-row items-center justify-between mb-3">
            <SkeletonPlaceholder width={140} height={18} borderRadius={6} />
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <View className="flex-row items-center">
                <SkeletonPlaceholder
                  width={14}
                  height={14}
                  borderRadius={4}
                  style={{ marginRight: 4 }}
                />
                <SkeletonPlaceholder width={50} height={14} borderRadius={6} />
              </View>
            </View>
          </View>

          {/* Store Name */}
          <View className="flex-row items-center gap-3 mb-2">
            <View className="bg-orange-50 p-2 rounded-full">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
            </View>
            <View className="flex-1">
              <SkeletonPlaceholder
                width={70}
                height={14}
                borderRadius={6}
                style={{ marginBottom: 4 }}
              />
              <SkeletonPlaceholder width="75%" height={16} borderRadius={6} />
            </View>
          </View>

          {/* Store Address */}
          <View className="flex-row items-center gap-3">
            <View className="bg-teal-50 p-2 rounded-full">
              <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
            </View>
            <View className="flex-1">
              <SkeletonPlaceholder
                width={85}
                height={14}
                borderRadius={6}
                style={{ marginBottom: 4 }}
              />
              <SkeletonPlaceholder width="80%" height={16} borderRadius={6} />
            </View>
          </View>
        </View>

        {/* Action Arrow */}
        <View className="flex-row justify-end mt-4 pt-4 border-t border-gray-200">
          <View className="flex-row items-center">
            <SkeletonPlaceholder
              width={80}
              height={14}
              borderRadius={6}
              style={{ marginRight: 8 }}
            />
            <SkeletonPlaceholder width={16} height={16} borderRadius={4} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default SellerCardSkeleton
