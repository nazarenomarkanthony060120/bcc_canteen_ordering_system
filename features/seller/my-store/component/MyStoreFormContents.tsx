import React from 'react'
import { Food } from '@/utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageWrapper from '@/components/parts/Image'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { CANTEEN_IMAGE } from '@/constants/image'
import Typo from '@/components/common/typo'
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { useDeleteFood } from '@/hooks/useMutation/seller/delete-food/useDeleteFood'

interface MyStoreFormContentsProps {
  food: Food
}

const MyStoreFormContents = ({ food }: MyStoreFormContentsProps) => {
  const deleteFood = useDeleteFood()

  const handleDeleteFood = () => {
    Alert.alert(
      'Delete Food Item',
      `Are you sure you want to delete "${food.name}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteFood.mutate(food.id, {
              onSuccess: () => {
                Alert.alert('Success', 'Food item deleted successfully!')
              },
              onError: (error) => {
                Alert.alert(
                  'Error',
                  'Failed to delete food item. Please try again.',
                )
                console.error('Delete error:', error)
              },
            })
          },
        },
      ],
    )
  }

  return (
    <SafeAreaView key={food.id} className="w-full mb-4">
      <BlurView
        intensity={20}
        tint="light"
        className="rounded-2xl overflow-hidden"
      >
        <LinearGradient
          colors={['#ffffff', '#f8fafc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-1"
        >
          <View className="bg-white rounded-xl overflow-hidden shadow-sm">
            <View className="relative">
              <ImageWrapper
                source={
                  food.image
                    ? { uri: `data:image/jpeg;base64,${food.image}` }
                    : CANTEEN_IMAGE
                }
                style={{ height: 200, width: '100%' }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                className="absolute bottom-0 left-0 right-0 p-4"
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Typo className="text-white text-xl font-bold">
                      {food.name}
                    </Typo>
                    <View className="flex-row items-center mt-1">
                      <MaterialCommunityIcons
                        name="currency-php"
                        size={16}
                        color="#10B981"
                      />
                      <Typo className="text-white/90 ml-1 font-semibold">
                        {food.price} Php
                      </Typo>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleDeleteFood}
                    className="bg-red-500/80 p-2 rounded-full ml-2"
                    activeOpacity={0.7}
                    disabled={deleteFood.isPending}
                  >
                    <MaterialIcons name="delete" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            <View className="p-4 space-y-3 gap-5">
              <View className="flex-row items-start gap-3">
                <View className="bg-emerald-50 p-2 rounded-lg mt-1">
                  <MaterialIcons name="description" size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm font-medium mb-1">
                    Description
                  </Text>
                  <Text className="text-gray-800 text-sm leading-5">
                    {food.description}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="bg-emerald-50 p-2 rounded-lg">
                    <MaterialIcons name="inventory" size={20} color="#10B981" />
                  </View>
                  <View>
                    <Typo className="text-gray-500 text-sm font-medium">
                      Available
                    </Typo>
                    <Typo className="text-gray-800 font-semibold">
                      {food.quantity} Available items
                    </Typo>
                  </View>
                </View>

                <View className="flex-row items-center gap-2">
                  <View className="bg-emerald-50 p-2 rounded-lg">
                    <AntDesign name="star" size={20} color="#10B981" />
                  </View>
                  <View>
                    <Typo className="text-gray-500 text-sm font-medium">
                      Popularity
                    </Typo>
                    <Typo className="text-gray-800 font-semibold">
                      {food.popularity}
                    </Typo>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </SafeAreaView>
  )
}

export default MyStoreFormContents
