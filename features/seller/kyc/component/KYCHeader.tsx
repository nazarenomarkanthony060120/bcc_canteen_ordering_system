import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { View } from 'react-native'

const KYCHeader = () => {
  const router = useRouter()

  const navigateToStore = () => {
    router.push('/screens/(seller)/dashboard/store')
  }

  return (
    <SafeAreaView className="mb-4">
      <View className="flex-row items-center justify-between">
        <Button
          className="flex-row items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm"
          onPress={navigateToStore}
          icon={
            <Ionicons
              name="arrow-back"
              size={20}
              color="#059669"
            />
          }
        >
          <Typo className="text-emerald-600 font-medium">Back</Typo>
        </Button>
        <View className="bg-emerald-200 px-4 py-2 rounded-full">
          <Typo className="text-slate-700 font-medium">KYC Verification</Typo>
        </View>
      </View>
      <View className="mt-6">
        <Typo className="text-2xl font-bold text-gray-800">Complete Your Profile</Typo>
        <Typo className="text-gray-600 mt-2">Please provide your information to verify your account</Typo>
      </View>
    </SafeAreaView>
  )
}

export default KYCHeader
