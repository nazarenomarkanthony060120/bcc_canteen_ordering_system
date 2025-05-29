import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import { Timestamp } from 'firebase/firestore'

interface HeaderProps {
  orderId: string
  createdAt: Timestamp
}

const Header = ({ orderId, createdAt }: HeaderProps) => {
  return (
    <BlurView intensity={20} className="rounded-3xl overflow-hidden mb-4">
      <LinearGradient
        colors={['#10B981', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-4"
      >
        <View className="flex-row items-center justify-between mb-2">
          <View>
            <Typo className="text-white/80 text-sm">Order ID</Typo>
            <Typo className="text-white text-xl font-bold">
              #{orderId.slice(-6)}
            </Typo>
          </View>
          <View
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Typo className="text-white font-semibold">
              {createdAtFormatted(createdAt)}
            </Typo>
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="bg-white/20 p-2 rounded-full mr-2">
            <MaterialIcons name="schedule" size={20} color="#FFFFFF" />
          </View>
          <Typo className="text-white/80">{createdAtFormatted(createdAt)}</Typo>
        </View>
      </LinearGradient>
    </BlurView>
  )
}

export default Header
