import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

interface EditFoodHeaderProps {
  storeId: string | null
}

const EditFoodHeader = ({ storeId }: EditFoodHeaderProps) => {
  const router = useRouter()

  const handleBack = () => {
    router.push(`/screens/(seller)/my-store/myStore?storeId=${storeId}`)
  }

  return (
    <SafeAreaView edges={['top']}>
      <LinearGradient
        colors={['#10B981', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-4 py-4"
      >
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={handleBack}
            className="bg-white/20 p-2 rounded-full"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Typo className="text-white text-2xl font-bold">Edit Food</Typo>
            <Typo className="text-white/80 text-sm">
              Update your food details
            </Typo>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default EditFoodHeader

