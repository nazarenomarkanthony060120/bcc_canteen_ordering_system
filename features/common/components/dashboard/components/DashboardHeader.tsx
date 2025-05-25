import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Typo from '@/components/common/typo'
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { getUserProfileRoutes } from '@/features/common/parts/getUserProfileRoutes'
import DashboardHeaderIcons from './DashboardHeaderIcons'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'

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
              className="bg-emerald-100 p-1 rounded-full mr-3 overflow-hidden"
              onPress={handleProfilePress}
            >
              <View className="overflow-hidden rounded-full">
                <ImageWrapper
                  source={
                    userData?.image
                      ? { uri: `data:image/jpeg;base64,${userData.image}` }
                      : PERSON_ICON
                  }
                  style={{ height: 40, width: 40 }}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
            <View>
              <Typo className="text-gray-500">Welcome back,</Typo>
              <View style={{ maxWidth: 150 }}>
                <Typo
                  className="text-gray-800 text-xl font-semibold"
                  style={{ width: '100%' }}
                >
                  {/* {userData?.name
                    ? userData.name.length > 30
                      ? userData.name.slice(0, 30) + '...'
                      : userData.name
                    : 'User'} */}
                  {userData?.name}
                </Typo>
              </View>
            </View>
          </View>
          <DashboardHeaderIcons />
        </View>
        {/* <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100">
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
        </View> */}
      </View>
    </BlurView>
  )
}

export default DashboardHeader
