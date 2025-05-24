import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'

interface AddFoodFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const AddFoodFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: AddFoodFormFooterProps) => {
  return (
    <SafeAreaView className="gap-3 mt-10">
      <View className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg">
        <LinearGradient
          colors={['#10B981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl overflow-hidden"
        >
          <Button
            className="flex-row items-center justify-center gap-3 p-5"
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
          >
            <View className="bg-white/20 p-2 rounded-full">
              <MaterialIcons name="add-circle" size={24} color="white" />
            </View>
            <View>
              <Typo className="text-white font-semibold text-lg">
                Create Food
              </Typo>
              <Typo className="text-white/80 text-xs">
                Add this item to your store menu
              </Typo>
            </View>
          </Button>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export default AddFoodFormFooter
