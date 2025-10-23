import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { getUserCartRoutes } from '@/features/common/parts/getUserCartRoutes'
import { UserType } from '@/utils/types'
import { useFetchNotifications } from '@/hooks/useQuery/notifications/useFetchNotifications'

const DashboardHeaderIcons = () => {
  const auth = useAuth()
  const { data: user } = useGetUserByUserId({ id: auth.user?.uid })
  const { data: notifications = [] } = useFetchNotifications(auth.user?.uid)
  const router = useRouter()
  
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleCartPress = () => {
    const route = getUserCartRoutes({ type: user?.type })
    router.push(route)
  }

  const handleMembersPress = () => {
    router.push('/screens/(admin)/dashboard/members')
  }

  const handleStoresPress = () => {
    router.push('/screens/(admin)/dashboard/stores')
  }

  const handleStorePress = () => {
    router.push('/screens/(seller)/dashboard/store')
  }

  const handleReservationPendingPress = () => {
    router.push('/screens/(seller)/dashboard/reservation-pending')
  }

  const handleNotificationsPress = () => {
    router.push('/screens/common/notifications')
  }

  return (
    <View className="flex-row gap-1">
      <TouchableOpacity
        className="bg-emerald-50 p-3 rounded-full relative"
        onPress={handleNotificationsPress}
      >
        <Ionicons name="notifications-outline" size={22} color="#10B981" />
        {unreadCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
            <Text className="text-white text-[10px] font-bold">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      
      {user?.type !== UserType.ADMIN && (
        <TouchableOpacity
          className="bg-emerald-50 p-3 rounded-full"
          onPress={handleCartPress}
        >
          <MaterialIcons name="shopping-cart" size={22} color="#10B981" />
        </TouchableOpacity>
      )}

      {user?.type === UserType.SELLER && (
        <>
          <TouchableOpacity
            className="bg-emerald-50 p-3 rounded-full"
            onPress={handleReservationPendingPress}
          >
            <MaterialIcons name="pending-actions" size={22} color="#10B981" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-emerald-50 p-3 rounded-full"
            onPress={handleStorePress}
          >
            <MaterialIcons name="store" size={22} color="#10B981" />
          </TouchableOpacity>
        </>
      )}

      {user?.type === UserType.ADMIN && (
        <>
          <TouchableOpacity
            className="bg-emerald-50 p-3 rounded-full"
            onPress={handleMembersPress}
          >
            <MaterialIcons name="people" size={22} color="#10B981" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-emerald-50 p-3 rounded-full"
            onPress={handleStoresPress}
          >
            <MaterialIcons name="store" size={22} color="#10B981" />
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default DashboardHeaderIcons
