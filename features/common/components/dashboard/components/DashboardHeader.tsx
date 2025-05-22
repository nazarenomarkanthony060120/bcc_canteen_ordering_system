import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { getUserProfileRoutes } from '@/features/common/parts/getUserProfileRoutes'
import { UserType } from '@/utils/types'
import AdminHeaderIcons from './AdminHeaderIcons'

const DashboardHeader = () => {
  const { user } = useAuth()
  const { data: userData } = useGetUserByUserId({ id: user?.uid })
  const router = useRouter()

  const handleProfilePress = () => {
    const route = getUserProfileRoutes({ type: userData?.type })
    router.push(route)
  }

  return (
    <BlurView intensity={10} className="rounded-3xl overflow-hidden mb-6">
      <View className="bg-white/90 p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              className="bg-emerald-100 p-2 rounded-full mr-3"
              onPress={handleProfilePress}
            >
              <MaterialIcons name="person" size={24} color="#10B981" />
            </TouchableOpacity>
            <View>
              <Typo className="text-gray-500">Welcome back,</Typo>
              <Typo className="text-gray-800 text-xl font-semibold">
                {userData?.name || 'User'}
              </Typo>
            </View>
          </View>
          {userData?.type === UserType.ADMIN && <AdminHeaderIcons />}
        </View>
        <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100">
          <View className="items-center">
            <Typo className="text-gray-800 font-semibold">Orders</Typo>
            <Typo className="text-emerald-600">12</Typo>
          </View>
          <View className="items-center">
            <Typo className="text-gray-800 font-semibold">Favorites</Typo>
            <Typo className="text-emerald-600">8</Typo>
          </View>
          <View className="items-center">
            <Typo className="text-gray-800 font-semibold">Points</Typo>
            <Typo className="text-emerald-600">250</Typo>
          </View>
        </View>
      </View>
    </BlurView>
  )
}

export default DashboardHeader
