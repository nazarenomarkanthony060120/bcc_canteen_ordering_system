import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ViewStoreHeader = () => {
  const router = useRouter()

  const navigateToBack = () => {
    router.push('/screens/(seller)/dashboard/dashboard')
  }
  return (
    <SafeAreaView className="p-5">
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

export default ViewStoreHeader
