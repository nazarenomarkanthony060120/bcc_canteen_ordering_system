import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
    <SafeAreaView className="py-5">
      <Button
        className="w-44 flex-row items-center gap-2"
        onPress={navigateToMyStore}
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

export default AddFoodHeader
