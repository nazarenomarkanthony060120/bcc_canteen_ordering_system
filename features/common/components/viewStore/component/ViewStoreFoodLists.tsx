import { Pressable, View, Text } from 'react-native'
import React from 'react'
import { Food, UserType } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE, HUMBA_IMAGE } from '@/constants/image'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import Button from '@/components/common/button'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '@/context/auth'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'

interface ViewStoreFoodListsProps {
  food: Food
}

const ViewStoreFoodLists = ({ food }: ViewStoreFoodListsProps) => {
  const auth = useAuth()
  const router = useRouter()

  const { data: user } = useGetUserByUserId({ id: auth.user?.uid })
  const navigateToViewFood = () => {
    router.push(`/screens/common/viewFood?foodId=${food.id}`)
  }

  return (
    <Pressable
      key={food.id}
      onPress={navigateToViewFood}
      className="mb-6 overflow-hidden rounded-3xl"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <LinearGradient
        colors={['#ffffff', '#f8fafc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6"
      >
        <View className="relative mb-4">
          <View className="overflow-hidden rounded-xl">
            <ImageWrapper
              source={
                food?.image
                  ? { uri: `data:image/jpeg;base64,${food.image}` }
                  : CANTEEN_IMAGE
              }
              style={{ height: 150, width: '100%' }}
            />
          </View>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            className="absolute bottom-0 left-0 right-0 h-24 rounded-b-2xl"
          />
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-white text-2xl font-bold mb-2">
              {food.name}
            </Text>
            <View className="flex-row items-center">
              <AntDesign name="star" size={20} color="#FCD34D" />
              <Text className="text-white/90 ml-2 text-base font-medium">
                {food.popularity} Popular
              </Text>
            </View>
          </View>
        </View>

        <View className="space-y-4">
          <View className="flex-row items-start gap-3">
            <Text className="text-gray-500 text-base">Description:</Text>
            <Text className="text-gray-700 text-base flex-1 leading-6">
              {food.description}
            </Text>
          </View>

          <View className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
            <View>
              <Text className="text-gray-500 text-base mb-1">Price</Text>
              <Text className="text-gray-800 text-xl font-semibold">
                ₱{food.price.toFixed(2)}
              </Text>
            </View>
            <View>
              <Text className="text-gray-500 text-base mb-1">Quantity</Text>
              <Text className="text-gray-800 text-xl font-semibold">
                {food.quantity} available
              </Text>
            </View>
          </View>

          {user?.type !== UserType.ADMIN && (
            <Button
              className="bg-sky-500 rounded-xl py-3.5 flex-row items-center justify-center gap-3"
              onPress={navigateToViewFood}
              icon={<AntDesign name="shoppingcart" size={24} color="white" />}
            >
              <Text className="text-white text-lg font-semibold">
                Order Now
              </Text>
            </Button>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  )
}

export default ViewStoreFoodLists
