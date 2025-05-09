import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { useAuth } from '@/context/auth'
import { getUserRoutes } from '../../parts/getUserRoutes'

const Cart = () => {
  const auth = useAuth()
  const { data: user } = useGetUserByUserId({ id: auth.user?.uid })
  const router = useRouter()

  const navitageToDashboard = () => {
    const route = getUserRoutes(user?.type)
    router.push(route)
  }
  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

export default Cart
