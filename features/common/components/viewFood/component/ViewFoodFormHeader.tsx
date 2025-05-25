import { View, Animated, Pressable } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Food, Store } from '@/utils/types'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '@/context/auth'
import { useToggleFavorite } from '@/hooks/useMutation/common/useToggleFavorite'
import { useIsFoodFavorited } from '@/hooks/useQuery/common/useIsFoodFavorited'
import { useUpdateFavoriteFood } from '@/hooks/useMutation/common/useUpdateFavoriteFood'
import { useFoodPopularity } from '@/hooks/useQuery/common/useFoodPopularity'

interface ViewFoodFormHeaderProps {
  food: Food | null | undefined
  store: Store | null | undefined
}

const ViewFoodFormHeader = ({ food, store }: ViewFoodFormHeaderProps) => {
  const { user } = useAuth()
  const { data: isFavorite = false } = useIsFoodFavorited({
    userId: user?.uid || '',
    foodId: food?.id || '',
  })
  const {
    data: popularity = 0,
    isFetching: isPopularityFetching,
    refetch: refetchPopularity,
  } = useFoodPopularity({
    foodId: food?.id || '',
  })
  const toggleFavoriteMutation = useToggleFavorite()
  const updateFavoriteFoodMutation = useUpdateFavoriteFood()
  const heartScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    console.log('Popularity updated:', popularity)
    console.log('Is fetching:', isPopularityFetching)
  }, [popularity, isPopularityFetching])

  const toggleFavorite = async () => {
    if (!user?.uid || !food?.id) return

    try {
      console.log('Toggling favorite...')
      const newFavoriteState = await toggleFavoriteMutation.mutateAsync({
        userId: user.uid,
        foodId: food.id,
      })
      console.log('New favorite state:', newFavoriteState)

      await updateFavoriteFoodMutation.mutateAsync({
        foodId: food.id,
        increment: newFavoriteState,
      })
      console.log('Updated favorite food')

      // Force refetch popularity
      await refetchPopularity()
      console.log('Refetched popularity')

      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(heartScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <View className="relative">
      <View className="overflow-hidden rounded-xl">
        <ImageWrapper
          source={
            food?.image
              ? { uri: `data:image/jpeg;base64,${food.image}` }
              : CANTEEN_IMAGE
          }
          style={{ height: 250, width: '100%' }}
        />
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        className="absolute bottom-0 left-0 right-0 h-40"
      />
      <View className="absolute top-4 right-4">
        <Pressable
          onPress={toggleFavorite}
          className="bg-white/20 backdrop-blur-md p-3 rounded-full"
        >
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <AntDesign
              name={isFavorite ? 'heart' : 'hearto'}
              size={24}
              color={isFavorite ? '#EF4444' : '#fff'}
            />
          </Animated.View>
        </Pressable>
      </View>
      <View className="absolute bottom-6 left-4 right-4">
        <View className="flex-row items-center justify-between mb-3">
          <View className="bg-emerald-500 px-4 py-2 rounded-full">
            <Typo className="text-white text-sm font-medium">
              {food?.type || 'Food Item'}
            </Typo>
          </View>
          <View className="bg-white/20 backdrop-blur-md px-3 py-2 rounded-full">
            <View className="flex-row items-center">
              <MaterialIcons name="star" size={18} color="#FCD34D" />
              <Typo className="text-white text-sm ml-1 font-medium">
                {isPopularityFetching ? '...' : `${popularity} Popular`}
              </Typo>
            </View>
          </View>
        </View>
        <Typo className="text-white text-3xl font-bold mb-2">{food?.name}</Typo>
        <View className="flex-row items-center">
          <MaterialIcons name="store" size={18} color="#fff" />
          <Typo className="text-white/90 ml-2 text-base font-medium">
            {store?.store}
          </Typo>
        </View>
      </View>
    </View>
  )
}

export default ViewFoodFormHeader
