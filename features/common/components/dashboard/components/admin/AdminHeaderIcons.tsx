import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const AdminHeaderIcons = () => {
  const router = useRouter()

  const handleCartPress = () => {
    router.push('/screens/(admin)/dashboard/cart')
  }

  const handleMembersPress = () => {
    router.push('/screens/(admin)/dashboard/members')
  }

  const handleStoresPress = () => {
    router.push('/screens/(admin)/dashboard/stores')
  }

  return (
    <View className="flex-row gap-2">
      <TouchableOpacity
        className="bg-emerald-50 p-3 rounded-full"
        onPress={handleCartPress}
      >
        <MaterialIcons name="shopping-cart" size={24} color="#10B981" />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-emerald-50 p-3 rounded-full"
        onPress={handleMembersPress}
      >
        <MaterialIcons name="people" size={24} color="#10B981" />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-emerald-50 p-3 rounded-full"
        onPress={handleStoresPress}
      >
        <MaterialIcons name="store" size={24} color="#10B981" />
      </TouchableOpacity>
    </View>
  )
}

export default AdminHeaderIcons
