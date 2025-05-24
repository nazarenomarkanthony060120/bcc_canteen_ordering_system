import React, { useRef, useEffect, useState } from 'react'
import { View, Animated, ScrollView, RefreshControl } from 'react-native'
import Seller from '../../Seller'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import Button from '@/components/common/button'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'

interface PendingKYCProps {
  onRefresh: () => Promise<void>
}

const PendingKYC = ({ onRefresh }: PendingKYCProps) => {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
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

  const handleAddStore = () => {
    router.push('/screens/(seller)/kyc/kyc')
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#10B981"
              colors={['#10B981']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <Animated.View
            className="flex-1 items-center justify-center px-6"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            }}
          >
            <BlurView
              intensity={20}
              tint="light"
              className="rounded-3xl overflow-hidden w-full max-w-sm"
            >
              <View className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/30">
                <View className="items-center mb-6">
                  <Animated.View className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-full mb-4 shadow-sm">
                    <MaterialIcons
                      name="verified-user"
                      size={48}
                      color="#10B981"
                    />
                  </Animated.View>
                  <Typo className="text-gray-800 text-2xl font-bold mb-2">
                    KYC Verification Pending
                  </Typo>
                  <Typo className="text-gray-500 text-center leading-6">
                    We're currently reviewing your KYC submission. This process helps us ensure a secure and trustworthy marketplace for all users.
                  </Typo>
                </View>

                <View className="bg-gradient-to-br from-emerald-50/80 to-emerald-100/80 p-4 rounded-2xl border border-emerald-100/50 mb-6">
                  <View className="flex-row items-center gap-3 mb-3">
                    <View className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-2 rounded-full shadow-sm">
                      <MaterialIcons name="info" size={20} color="#10B981" />
                    </View>
                    <Typo className="text-emerald-800 font-medium flex-1">
                      What to Expect
                    </Typo>
                  </View>
                  <View className="space-y-3">
                    <View className="flex-row items-center gap-2">
                      <MaterialIcons
                        name="schedule"
                        size={16}
                        color="#10B981"
                      />
                      <Typo className="text-emerald-700 text-sm">
                        Verification typically takes 1-2 business days
                      </Typo>
                    </View>
                  </View>
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </Seller>
  )
}

export default PendingKYC
