import React from 'react'
import { View, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import SkeletonPlaceholder from './SkeletonPlaceholder'

const DashboardCategoriesSkeleton = () => {
  return (
    <BlurView intensity={10} className="rounded-3xl overflow-hidden mb-6">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            {/* Categories title skeleton */}
            <SkeletonPlaceholder
              width={90}
              height={18}
              borderRadius={6}
              style={{ marginBottom: 4 }}
            />
            {/* Categories subtitle skeleton */}
            <SkeletonPlaceholder width={140} height={14} borderRadius={6} />
          </View>
        </View>

        {/* Categories horizontal scroll skeleton */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <View key={index} className="mr-4 items-center">
              {/* Category icon container skeleton */}
              <View className="p-4 rounded-2xl mb-2 bg-gray-100">
                <SkeletonPlaceholder width={24} height={24} borderRadius={4} />
              </View>
              {/* Category name skeleton */}
              <SkeletonPlaceholder width={60} height={14} borderRadius={6} />
            </View>
          ))}
        </ScrollView>
      </View>
    </BlurView>
  )
}

export default DashboardCategoriesSkeleton

