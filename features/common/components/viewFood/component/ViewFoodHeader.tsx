import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '@/context/auth'
import { getUserRoutes } from '@/features/common/parts/getUserRoutes'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'

const ViewFoodHeader = () => {
  const auth = useAuth()
  const { data: user } = useGetUserByUserId({ id: auth.user?.uid })
  const router = useRouter()

  const navigateToBack = () => {
    const route = getUserRoutes({ type: user?.type })
    router.push(route)
  }

  return (
    <SafeAreaView className="px-4 py-2">
      <BlurView intensity={20} className="rounded-2xl overflow-hidden">
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.05)']}
          className="p-4"
        >
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={navigateToBack}
              className="bg-white px-4 py-2.5 rounded-xl flex-row items-center gap-2 shadow-sm"
            >
              <Ionicons name="arrow-back" size={20} color="#10B981" />
              <Typo className="text-emerald-600 font-medium">Back</Typo>
            </TouchableOpacity>
            <View className="bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm">
              <Typo className="text-emerald-600 font-medium">Food Details</Typo>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </SafeAreaView>
  )
}

export default ViewFoodHeader
