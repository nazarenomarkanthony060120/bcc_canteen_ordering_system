import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'

const RegisterFooter = () => {
  const router = useRouter()

  const navigateToLogin = () => {
    router.replace('/(auth)/login')
  }

  return (
    <SafeAreaView className="py-5">
      <Button
        className="bg-emerald-300 items-center rounded-3xl p-5"
        onPress={navigateToLogin}
      >
        <Typo className="text-slate-600">
          Already have an account? Login Here
        </Typo>
      </Button>
    </SafeAreaView>
  )
}

export default RegisterFooter
