import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const ViewStoreHeader = () => {
  const router = useRouter()

  const navigateToBack = () => {
    router.back()
  }

  return (
    <SafeAreaView className="px-4 pt-2 pb-4">
      <View className="flex-row items-center justify-between">
        <Button
          className="flex-row items-center gap-2.5"
          onPress={navigateToBack}
          icon={
            <View className="bg-white rounded-full p-2.5 shadow-sm">
              <Ionicons name="chevron-back" size={24} color="#1E40AF" />
            </View>
          }
        >
          <View>
            <Typo className="text-gray-500 text-sm">Back to</Typo>
            <Typo className="text-gray-800 font-semibold">Stores</Typo>
          </View>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ViewStoreHeader
