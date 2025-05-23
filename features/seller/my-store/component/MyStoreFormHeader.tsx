import { SafeAreaView, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

interface MyStoreFormHeaderProps {
  store: string | undefined
}

const MyStoreFormHeader = ({ store }: MyStoreFormHeaderProps) => {
  const router = useRouter()

  return (
    <SafeAreaView className="items-center justify-center gap-3 p-5">
      <View className="w-full flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-emerald-50 p-2 rounded-full"
        >
          <MaterialIcons name="arrow-back" size={24} color="#10B981" />
        </TouchableOpacity>
      </View>
      <ImageWrapper
        source={CANTEEN_IMAGE}
        style={{ height: 100, width: 140 }}
      />
      <Typo className="text-[34px] text-emerald-700 font-bold text-center">
        {store}
      </Typo>
    </SafeAreaView>
  )
}

export default MyStoreFormHeader
