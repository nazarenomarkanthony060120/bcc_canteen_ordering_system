import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'

const LoginFooter = () => {
  const router = useRouter()

  const navigateToRegister = () => {
    router.replace('/(auth)/register')
  }

  return (
    <SafeAreaView className="py-5">
      <Button
        className="bg-emerald-300 items-center rounded-3xl p-5"
        onPress={navigateToRegister}
      >
        <Typo>Create an account</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default LoginFooter
