import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { useRouter } from 'expo-router'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { getUserRoutes } from '@/features/common/parts/getUserRoutes'

const ProfileFormHeader = () => {
  const auth = useAuth()
  const { data: user } = useGetUserByUserId({ id: auth.user?.uid })
  const router = useRouter()

  const navigateToDashboard = () => {
    const route = getUserRoutes({ type: user?.type })
    router.push(route)
  }

  return (
    <SafeAreaView className="w-full flex-row justify-end items-center mb-2">
      <Button
        className="flex-row items-center bg-white/20 rounded-xl px-3 py-2 mr-1 mt-2"
        onPress={navigateToDashboard}
        icon={
          <View className="bg-white/30 rounded-full p-1 mr-2">
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </View>
        }
      >
        <Typo className="text-white font-bold text-base">Back</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default ProfileFormHeader
