import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

const MembersHeader = () => {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/screens/(admin)/dashboard/dashboard')
  }

  return (
    <View className="flex-row items-center mt-2 mb-2">
      <Pressable
        onPress={navigateToDashboard}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.18)',
          borderRadius: 18,
          paddingVertical: 8,
          paddingHorizontal: 14,
          marginLeft: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.13,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
            marginLeft: 6,
          }}
        >
          Back
        </Text>
      </Pressable>
    </View>
  )
}

export default MembersHeader
