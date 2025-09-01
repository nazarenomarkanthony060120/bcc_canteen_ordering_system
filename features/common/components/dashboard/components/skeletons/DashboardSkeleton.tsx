import React, { useRef, useEffect } from 'react'
import { View, Animated, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import Typo from '@/components/common/typo'
import DashboardHeaderSkeleton from './DashboardHeaderSkeleton'
import DashboardCategoriesSkeleton from './DashboardCategoriesSkeleton'
import DashboardFormCardSkeleton from './DashboardFormCardSkeleton'
import ScreenLayout from '../../../screenLayout/ScreenLayout'

const DashboardSkeleton = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1">
        <LinearGradient
          colors={['#F0FDF4', '#FFFFFF']}
          className="flex-1"
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1"
          >
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <View className="p-4">
                {/* Header Skeleton */}
                <DashboardHeaderSkeleton />

                {/* Categories Skeleton */}
                <DashboardCategoriesSkeleton />

                {/* Popular Items Section */}
                <BlurView
                  intensity={10}
                  className="rounded-3xl overflow-hidden"
                >
                  <View className="bg-white/90 p-4">
                    <View className="flex-row items-center justify-between mb-4">
                      <Typo className="text-gray-800 font-semibold">
                        Popular Items
                      </Typo>
                    </View>
                    <DashboardFormCardSkeleton />
                  </View>
                </BlurView>
              </View>
            </ScrollView>
          </Animated.View>
        </LinearGradient>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default DashboardSkeleton
