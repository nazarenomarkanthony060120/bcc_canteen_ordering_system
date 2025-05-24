import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

const UserDetailsFormHeader = () => {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/screens/(admin)/dashboard/members')
  }

  return (
    <SafeAreaView>
      <View className="flex-row items-center">
        <Button
          className="flex-row items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl"
          onPress={navigateToDashboard}
          icon={<Ionicons name="arrow-back" size={20} color="white" />}
        >
          <Typo className="text-white font-medium">Back</Typo>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default UserDetailsFormHeader
