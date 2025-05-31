import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

const UsersHeader = () => {
  const router = useRouter()
  const navigateToBack = () => {
    router.back()
  }

  return (
    <View className="flex-row items-center justify-between">
      <Pressable
        onPress={navigateToBack}
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

export default UsersHeader
