import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { getUserRoutes } from '@/features/common/parts/getUserRoutes'

const CartHeader = () => {
  const auth = useAuth()
  const { data: user } = useGetUserByUserId({ id: auth.user?.uid })
  const router = useRouter()

  const navigateToDashboard = () => {
    const route = getUserRoutes({ type: user?.type })
    router.push(route)
  }

  return (
    <SafeAreaView>
      <Button
        className="w-44 flex-row items-center gap-3"
        onPress={navigateToDashboard}
        icon={
          <Ionicons
            name="arrow-back"
            className="bg-cyan-500 rounded-lg p-2"
            size={16}
            color="white"
          />
        }
      >
        <Typo>Back</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default CartHeader
