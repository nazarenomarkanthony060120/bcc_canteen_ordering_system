import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'

interface MyStoreFooterProps {
  storeId: string | null
}

const MyStoreFooter = ({ storeId }: MyStoreFooterProps) => {
  const router = useRouter()

  const navigateToAddFood = () => {
    router.push(`/screens/(seller)/add-food/add-food?storeId=${storeId}`)
  }

  return (
    <SafeAreaView className="gap-3 px-5 py-2">
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
