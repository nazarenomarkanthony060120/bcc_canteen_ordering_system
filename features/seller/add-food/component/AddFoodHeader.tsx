import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'

interface AddFoodHeaderProps {
  storeId: string | null
}

const AddFoodHeader = ({ storeId }: AddFoodHeaderProps) => {
  const router = useRouter()

  const navigateToMyStore = () => {
    router.push(`/screens/(seller)/my-store/myStore?storeId=${storeId}`)
  }

  return (
    <SafeAreaView className="py-4">
      <View className="flex-row items-center">
        <Button
          className="bg-white/90 px-4 py-2.5 rounded-xl flex-row items-center gap-2 shadow-sm"
          onPress={navigateToMyStore}
        >
          <Ionicons name="chevron-back" size={20} color="#059669" />
          <Typo className="text-emerald-600 font-medium">Back to Store</Typo>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default AddFoodHeader
