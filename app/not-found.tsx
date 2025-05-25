import React from 'react'
import { View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import Button from '@/components/common/button'

const NotFound = () => {
  const router = useRouter()

  const handleGoHome = () => {
    router.back()
  }

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="absolute inset-0"
      />
      <View className="flex-1 items-center justify-center p-6">
        <View className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm w-full max-w-sm">
          <View className="items-center mb-6">
            <View className="bg-red-50 p-4 rounded-full mb-4">
              <MaterialIcons name="error-outline" size={48} color="#EF4444" />
            </View>
            <Typo className="text-gray-800 text-2xl font-bold mb-2">
              Page Not Found
            </Typo>
            <Typo className="text-gray-500 text-center">
              Oops! The page you're looking for doesn't exist or has been moved.
            </Typo>
          </View>

          <Button
            className="bg-emerald-500 rounded-xl flex-row items-center justify-center gap-2 py-4"
            onPress={handleGoHome}
          >
            <MaterialIcons name="home" size={24} color="white" />
            <Typo className="text-white font-semibold">Go to Home</Typo>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NotFound
