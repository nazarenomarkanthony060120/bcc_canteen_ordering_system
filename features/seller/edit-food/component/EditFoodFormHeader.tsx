import React from 'react'
import { View } from 'react-native'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'

const EditFoodFormHeader = () => {
  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-center gap-2 mb-2">
        <View className="bg-emerald-100 p-2 rounded-lg">
          <MaterialIcons name="edit" size={24} color="#059669" />
        </View>
        <View>
          <Typo className="text-xl font-bold text-gray-800">
            Food Information
          </Typo>
          <Typo className="text-sm text-gray-500">
            Update the details of your food item
          </Typo>
        </View>
      </View>
    </View>
  )
}

export default EditFoodFormHeader

