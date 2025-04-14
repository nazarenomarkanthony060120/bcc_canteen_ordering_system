import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'

const MyStoreFooter = () => {
  const router = useRouter()

  const navigateToAddFood = () => {
    router.replace('/screens/(seller)/add-food/add-food')
  }

  return (
    <SafeAreaView className="gap-3 mb-10">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={navigateToAddFood}
      >
        <Typo className="text-white">Add Food</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default MyStoreFooter
