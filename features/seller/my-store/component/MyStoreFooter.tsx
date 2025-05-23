import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

interface MyStoreFooterProps {
  storeId: string | null
}

const MyStoreFooter = ({ storeId }: MyStoreFooterProps) => {
  const router = useRouter()

  const navigateToAddFood = () => {
    router.push(`/screens/(seller)/add-food/add-food?storeId=${storeId}`)
  }

  return (
    <SafeAreaView className="gap-3 px-5 py-2">
      <View className="bg-white/10 backdrop-blur-md rounded-3xl p-[2px] shadow-lg">
        <LinearGradient
          colors={['#10B981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl overflow-hidden"
        >
          <Button
            className="flex-row items-center justify-center gap-3 p-5"
            onPress={navigateToAddFood}
          >
            <View className="bg-white/20 p-2 rounded-full">
              <MaterialIcons name="add-circle" size={24} color="white" />
            </View>
            <View>
              <Typo className="text-white font-semibold text-lg">
                Add New Food
              </Typo>
              <Typo className="text-white/80 text-xs">
                Create a new food item for your store
              </Typo>
            </View>
          </Button>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export default MyStoreFooter
