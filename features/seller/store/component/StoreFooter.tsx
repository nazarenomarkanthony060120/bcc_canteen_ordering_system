import React, { useRef } from 'react'
import { View, TouchableOpacity, Animated } from 'react-native'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

const StoreFooter = () => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handleAddStore = () => {
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
    ]).start()

    router.push('/screens/(seller)/add-store/add-store')
  }

  return (
    <View className="absolute bottom-0 left-0 right-0 p-6">
      <BlurView
        intensity={20}
        tint="light"
        className="rounded-2xl overflow-hidden"
      >
        <LinearGradient
          colors={['#10B981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-4 rounded-2xl"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Typo className="text-white text-lg font-bold mb-1">
                Want to add another store?
              </Typo>
              <Typo className="text-white/80 text-sm">
                Expand your business by adding more stores
              </Typo>
            </View>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                onPress={handleAddStore}
                className="bg-white/20 p-3 rounded-xl"
              >
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  )
}

export default StoreFooter
