import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import ImageWrapper from '@/components/parts/Image'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'
import { SPLASH_ICON } from '@/constants/image'
import Footer from '@/components/parts/Footer'
import { useGetSystemHealth } from '@/hooks/useQuery/health/health'
import { getSystemHealth } from '@/features/common/parts/getSystemHealth'
import { SystemHealth } from '@/utils/collections'
import TimeOut from '@/features/common/components/timeout/TimeOut'

const index = () => {
  const { data: health, isFetching } = useGetSystemHealth()
  const result = getSystemHealth(health ?? SystemHealth.DEAD)
  const router = useRouter()

  if (!router) return

  if (isFetching)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )

  if (result) return <TimeOut />

  const navigateToLogin = () => {
    router.navigate('/(auth)/login')
  }

  const navigateToRegister = () => {
    router.navigate('/(auth)/register')
  }

  console.log(health)

  return (
    <View className="flex-1 px-10 bg-[#ccffcc]">
      <View className="h-1/2 flex items-center justify-center">
        <ImageWrapper source={SPLASH_ICON} />
      </View>
      <View className="flex justify-between h-1/2 pb-5 ">
        <View className="flex gap-5">
          <View>
            <Typo className="text-center text-2xl font-bold text-[#02bf15]">
              BCC Canteen Ordering APP
            </Typo>
          </View>
          <View>
            <Typo className="text-center text-md font-bold text-[#4b9653] leading-7">
              Satisfy your cravings in seconds—order your favorite meals
              effortlessly with the BCC Canteen App, where convenience meets
              deliciousness! 🍔📱✨
            </Typo>
          </View>
        </View>

        <Footer className="flex gap-4">
          <Button
            className="bg-emerald-800 items-center rounded-3xl p-5"
            onPress={navigateToLogin}
          >
            <Typo className="text-white">Sign In</Typo>
          </Button>
          <Button className="items-center p-5" onPress={navigateToRegister}>
            <Typo>Create an account</Typo>
          </Button>
        </Footer>
      </View>
    </View>
  )
}

export default index
