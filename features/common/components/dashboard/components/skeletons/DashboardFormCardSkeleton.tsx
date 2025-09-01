import React from 'react'
import { View, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import SkeletonPlaceholder from './SkeletonPlaceholder'

const DashboardFormCardSkeleton = () => {
  return (
    <BlurView intensity={10} className="rounded-3xl overflow-hidden">
      <View className="bg-white/90 p-4">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View>
            {/* Featured Stores Section */}
            <View className="flex-row items-center gap-2 mb-4">
              <View className="bg-emerald-50 p-2 rounded-full">
                <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
              </View>
              <SkeletonPlaceholder width={120} height={18} borderRadius={6} />
            </View>

            {/* Store cards skeleton */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <View key={index} className="mr-4 w-64">
                  <View className="bg-white rounded-2xl p-4 shadow-sm">
                    {/* Store image skeleton */}
                    <SkeletonPlaceholder
                      width="100%"
                      height={120}
                      borderRadius={12}
                      style={{ marginBottom: 12 }}
                    />
                    {/* Store name skeleton */}
                    <SkeletonPlaceholder
                      width="80%"
                      height={16}
                      borderRadius={6}
                      style={{ marginBottom: 8 }}
                    />
                    {/* Store details skeleton */}
                    <SkeletonPlaceholder
                      width="60%"
                      height={14}
                      borderRadius={6}
                      style={{ marginBottom: 4 }}
                    />
                    <SkeletonPlaceholder
                      width="40%"
                      height={14}
                      borderRadius={6}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Popular Foods Section */}
            <View className="flex-row items-center gap-2 mt-6 mb-4">
              <View className="bg-emerald-50 p-2 rounded-full">
                <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
              </View>
              <SkeletonPlaceholder width={110} height={18} borderRadius={6} />
            </View>

            {/* Popular foods grid skeleton */}
            <View className="flex-row flex-wrap justify-between mb-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <View key={index} className="w-[48%] mb-4">
                  <View className="bg-white rounded-2xl p-3 shadow-sm">
                    {/* Food image skeleton */}
                    <SkeletonPlaceholder
                      width="100%"
                      height={100}
                      borderRadius={12}
                      style={{ marginBottom: 8 }}
                    />
                    {/* Food name skeleton */}
                    <SkeletonPlaceholder
                      width="90%"
                      height={14}
                      borderRadius={6}
                      style={{ marginBottom: 6 }}
                    />
                    {/* Price skeleton */}
                    <SkeletonPlaceholder
                      width="50%"
                      height={16}
                      borderRadius={6}
                      style={{ marginBottom: 4 }}
                    />
                    {/* Store name skeleton */}
                    <SkeletonPlaceholder
                      width="70%"
                      height={12}
                      borderRadius={6}
                    />
                  </View>
                </View>
              ))}
            </View>

            {/* New Arrivals Section */}
            <View className="flex-row items-center gap-2 mt-6 mb-4">
              <View className="bg-emerald-50 p-2 rounded-full">
                <SkeletonPlaceholder width={20} height={20} borderRadius={4} />
              </View>
              <SkeletonPlaceholder width={100} height={18} borderRadius={6} />
            </View>

            {/* New arrivals grid skeleton */}
            <View className="flex-row flex-wrap justify-between">
              {Array.from({ length: 4 }).map((_, index) => (
                <View key={index} className="w-[48%] mb-4">
                  <View className="bg-white rounded-2xl p-3 shadow-sm">
                    {/* Food image skeleton */}
                    <SkeletonPlaceholder
                      width="100%"
                      height={100}
                      borderRadius={12}
                      style={{ marginBottom: 8 }}
                    />
                    {/* Food name skeleton */}
                    <SkeletonPlaceholder
                      width="90%"
                      height={14}
                      borderRadius={6}
                      style={{ marginBottom: 6 }}
                    />
                    {/* Price skeleton */}
                    <SkeletonPlaceholder
                      width="50%"
                      height={16}
                      borderRadius={6}
                      style={{ marginBottom: 4 }}
                    />
                    {/* Store name skeleton */}
                    <SkeletonPlaceholder
                      width="70%"
                      height={12}
                      borderRadius={6}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </BlurView>
  )
}

export default DashboardFormCardSkeleton
