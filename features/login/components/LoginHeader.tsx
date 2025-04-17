import React from 'react'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const LoginHeader = () => {
  const router = useRouter()

  const navigateToBack = () => {
    router.push('/')
  }

  return (
    <SafeAreaView className="py-5">
      <Button
        className="w-44 flex-row items-center gap-2"
        onPress={navigateToBack}
        icon={
          <Ionicons
            name="arrow-back"
            className="bg-emerald-700 rounded-lg p-2"
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

export default LoginHeader
