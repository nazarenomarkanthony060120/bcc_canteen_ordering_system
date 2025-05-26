import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

const ReservationHeader = () => {
  return (
    <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-6">
      <LinearGradient
        colors={['#10B981', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-4"
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Typo className="text-white text-2xl font-bold mb-1">
              Your Reservations
            </Typo>
            <Typo className="text-white/80">Track your orders</Typo>
          </View>
          <View className="bg-white/20 p-3 rounded-full">
            <MaterialIcons name="receipt-long" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>
    </BlurView>
  )
}

export default ReservationHeader
