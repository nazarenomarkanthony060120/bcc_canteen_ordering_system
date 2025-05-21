import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Typo from '@/components/common/typo'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const MembersFormHeader = () => {
  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 18, marginBottom: 16 }}
    >
      <SafeAreaView className="flex-row items-center gap-3 px-4 py-4">
        <View className="bg-white/30 rounded-full p-2">
          <Ionicons name="people" size={28} color="#fff" />
        </View>
        <View className="flex-1">
          <Typo className="text-white text-xl font-bold">
            Check and Verify the Users
          </Typo>
          <Typo className="text-white/80 text-xs mt-1">
            Manage, approve, or decline user accounts below.
          </Typo>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default MembersFormHeader
