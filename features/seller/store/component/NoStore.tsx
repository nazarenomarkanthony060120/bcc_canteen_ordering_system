import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import Seller from '../../Seller'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import Button from '@/components/common/button'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'

const NoStore = () => {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
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
    router.push('/screens/(seller)/add-store/add-store')
  }

  return (
    <Seller className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1 px-6">
        <Animated.View
          className="flex-1 items-center justify-center"
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
                <View className="bg-emerald-50 p-4 rounded-full mb-4">
                  <MaterialIcons name="store" size={48} color="#10B981" />
                </View>
                <Typo className="text-gray-800 text-2xl font-bold mb-2">
                  No Store Found
                </Typo>
                <Typo className="text-gray-500 text-center">
                  You haven't created any stores yet. Start by adding your first
                  store to begin selling your products.
                </Typo>
              </View>

              <Button
                className="bg-emerald-500 rounded-xl flex-row items-center justify-center gap-2 py-4"
                onPress={handleAddStore}
              >
                <MaterialIcons name="add" size={24} color="white" />
                <Typo className="text-white font-semibold">Add New Store</Typo>
              </Button>
            </View>
          </BlurView>
        </Animated.View>
      </SafeAreaView>
    </Seller>
  )
}

export default NoStore
