import React, { useRef } from 'react'
import { SafeAreaView, Animated, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

const AddStoreHeader = () => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(1)).current

  const navigateToStore = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/screens/(seller)/dashboard/store')
    })
  }

  return (
    <SafeAreaView className="py-5">
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <BlurView intensity={20} tint="light" className="rounded-2xl overflow-hidden">
          <TouchableOpacity
            onPress={navigateToStore}
            activeOpacity={0.9}
            className="flex-row items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-white/30"
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-2 rounded-xl"
            >
              <Ionicons name="arrow-back" size={20} color="white" />
            </LinearGradient>
            <View className="flex-1">
              <Typo className="text-gray-700 font-medium">Back</Typo>
            </View>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    </SafeAreaView>
  )
}

export default AddStoreHeader
