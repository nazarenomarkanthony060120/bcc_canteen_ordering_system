import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

const ProfileFormHeader = () => {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/screens/(admin)/dashboard/dashboard')
  }

  return (
    <SafeAreaView>
      <Button
        className="w-44 flex-row items-center gap-2"
        onPress={navigateToDashboard}
        icon={
          <Ionicons
            name="arrow-back"
            className="bg-emerald-700 rounded-lg p-2"
            size={16}
            color="white"
          />
        }
      >
        <Typo className="text-white">Back</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default ProfileFormHeader
