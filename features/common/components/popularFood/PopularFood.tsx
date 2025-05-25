import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { useFetchAllPopularFoods } from '@/hooks/useQuery/common/fetch/useFetchAllPopularFoods'
import { FoodType } from '@/utils/types'
import Typo from '@/components/common/typo'
import { MaterialIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'

interface PopularFoodProps {
  selectedFoodType: FoodType | null
}

const PopularFood: React.FC<PopularFoodProps> = ({ selectedFoodType }) => {
  const router = useRouter()
  const { data: popularFoods } = useFetchAllPopularFoods()
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({})

  const filteredFoods = selectedFoodType
    ? popularFoods?.filter((food) => food.type === selectedFoodType)
    : popularFoods

  const handleFoodPress = (foodId: string) => {
    router.push(`/screens/common/viewFood?foodId=${foodId}`)
  }

  const handleImageError = (foodId: string) => {
    setImageErrors(prev => ({ ...prev, [foodId]: true }))
  }

  if (!filteredFoods?.length) {
    return (
      <View className="py-4">
        <Typo className="text-gray-500 text-center">No items found</Typo>
      </View>
    )
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row"
    >
      {filteredFoods.map((food) => (
        <TouchableOpacity
          key={food.id}
          className="mr-4 w-40"
          onPress={() => handleFoodPress(food.id)}
        >
          <BlurView intensity={10} className="rounded-2xl overflow-hidden">
            <View className="bg-white/90">
              <View className="aspect-square">
                {!imageErrors[food.id] ? (
                   <View className="overflow-hidden rounded-xl">
                   <ImageWrapper
                     source={
                       food.image
                         ? { uri: `data:image/jpeg;base64,${food.image}` }
                         : CANTEEN_IMAGE
                     }
                     style={{ height: 120, width: '100%' }}
                   />
                 </View>
                ) : (
                  <View className="w-full h-full bg-gray-200 items-center justify-center">
                    <MaterialIcons name="restaurant" size={32} color="#9CA3AF" />
                  </View>
                )}
              </View>
              <View className="">
                <Typo className="text-gray-800 font-medium mb-1">
                  {food.name}
                </Typo>
                <View className="flex-row items-center justify-between">
                  <Typo className="text-emerald-600 font-semibold">
                    ₱{food.price.toFixed(2)}
                  </Typo>
                  <View className="flex-row items-center">
                    <MaterialIcons name="star" size={16} color="#F59E0B" />
                    <Typo className="text-gray-600 text-sm ml-1">
                      {food.popularity}
                    </Typo>
                  </View>
                </View>
              </View>
            </View>
          </BlurView>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default PopularFood
