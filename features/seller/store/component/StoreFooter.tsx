import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import { useRouter } from 'expo-router'
import Typo from '@/components/common/typo'

const StoreFooter = () => {
  const router = useRouter()

  const navigateToCreateStore = () => {
    router.push('/screens/add-store/add-store')
  }

  return (
    <SafeAreaView className="gap-3 mb-20">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={navigateToCreateStore}
      >
        <Typo className="text-white">Create Another Store</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default StoreFooter
