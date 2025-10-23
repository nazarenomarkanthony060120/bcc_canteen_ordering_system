import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import EditFoodFormContents from './EditFoodFormContents'
import { SafeAreaView } from 'react-native-safe-area-context'
import Error from '@/components/parts/Error'
import { View, ActivityIndicator, Alert } from 'react-native'
import EditFoodFormHeader from './EditFoodFormHeader'
import EditFoodFormFooter from './EditFoodFormFooter'
import CountDown from '@/components/parts/CountDown'
import { useUpdateFood } from '@/hooks/useMutation/seller/update-food/useUpdateFood'
import { useFetchFoodById } from '@/hooks/useQuery/seller/useFetchFoodById'
import { BlurView } from 'expo-blur'
import Typo from '@/components/common/typo'

interface EditFoodFormCardProps {
  storeId: string | null
  foodId: string | null
}

const EditFoodFormCard = ({ storeId, foodId }: EditFoodFormCardProps) => {
  const [showCountdown, setShowCountdown] = useState(false)
  const { data: food, isLoading, isError } = useFetchFoodById(foodId)
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { mutate: updateFood, isPending, reset } = useUpdateFood()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!foodId) {
      Alert.alert('Error', 'Food ID is missing')
      return
    }

    const formData = {
      foodId: foodId,
      name: data.name,
      image: data.image,
      price: data.price,
      quantity: data.quantity,
      type: data.type,
      description: data.description,
    }

    updateFood(formData, {
      onSuccess: () => {
        Alert.alert('Success', 'Food item updated successfully!')
        setShowCountdown(true)
        reset()
      },
      onError: (error) => {
        Alert.alert('Error', 'Failed to update food item. Please try again.')
        console.error('Update error:', error)
      },
    })
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10B981" />
          <Typo className="text-gray-600 mt-4">Loading food details...</Typo>
        </View>
      </SafeAreaView>
    )
  }

  if (isError || !food) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center px-4">
          <Typo className="text-red-500 text-lg font-semibold">
            Error loading food details
          </Typo>
          <Typo className="text-gray-600 mt-2 text-center">
            Unable to fetch food information. Please try again.
          </Typo>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4 py-2">
        <EditFoodFormHeader />
        {showCountdown && (
          <CountDown
            time={5}
            route={`/screens/(seller)/my-store/myStore?storeId=${storeId}`}
            message="You will be redirected to your Store"
          />
        )}
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-2xl overflow-hidden mt-4"
        >
          <View className="p-6 bg-white/90 rounded-2xl">
            <EditFoodFormContents control={control} food={food} />
            <EditFoodFormFooter
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              isPending={isPending}
            />
          </View>
        </BlurView>
      </View>
      {Object.keys(errors).length > 0 && <Error errors={errors} />}
    </SafeAreaView>
  )
}

export default EditFoodFormCard

