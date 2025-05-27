import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { getUserCartRoutes } from '@/features/common/parts/getUserCartRoutes'
import { UserType } from '@/utils/types'

const DashboardHeaderIcons = () => {
  const auth = useAuth()
  const { data: user } = useGetUserByUserId({ id: auth.user?.uid })
  const router = useRouter()

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

  return (
    <View className="flex-row gap-1">
      <TouchableOpacity
        className="bg-emerald-50 p-3 rounded-full"
        onPress={handleCartPress}
      >
        <MaterialIcons name="shopping-cart" size={22} color="#10B981" />
      </TouchableOpacity>
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
