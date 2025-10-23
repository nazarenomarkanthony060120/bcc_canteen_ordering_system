import React from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

interface EditFoodFormFooterProps {
  handleSubmit: any
  onSubmit: any
  isPending: boolean
}

const EditFoodFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: EditFoodFormFooterProps) => {
  return (
    <View className="mt-6">
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        activeOpacity={0.8}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        <LinearGradient
          colors={isPending ? ['#9CA3AF', '#6B7280'] : ['#10B981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="py-4 px-6"
        >
          <View className="flex-row items-center justify-center gap-2">
            {isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <MaterialIcons name="save" size={24} color="white" />
            )}
            <Typo className="text-white text-lg font-bold">
              {isPending ? 'Saving...' : 'Save Changes'}
            </Typo>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default EditFoodFormFooter

