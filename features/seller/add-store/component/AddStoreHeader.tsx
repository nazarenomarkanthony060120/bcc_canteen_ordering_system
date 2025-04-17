import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'

const AddStoreHeader = () => {
  const router = useRouter()

  const navigateToStore = () => {
    router.push('/screens/(seller)/dashboard/store')
  }

  return (
    <SafeAreaView className="py-5">
      <Button
        className="w-44 flex-row items-center gap-2"
        onPress={navigateToStore}
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

export default AddStoreHeader
