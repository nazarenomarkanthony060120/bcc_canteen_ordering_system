import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import AddFoodFormContents from './AddFoodFormContents'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddFood } from '@/utils/types'
import Error from '@/components/parts/Error'
import { View } from 'react-native'
import AddFoodFormHeader from './AddFoodFormHeader'
import AddFoodFormFooter from './AddFoodFormFooter'
import CountDown from '@/components/parts/CountDown'
import { useSellerAddFood } from '@/hooks/useMutation/seller/add-food/useSellerAddFood'
import { BlurView } from 'expo-blur'

interface AddFoodFormCardProps {
  storeId: string | null
}

const AddFoodFormCard = ({ storeId }: AddFoodFormCardProps) => {
  const [showCountdown, setShowCountdown] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { mutate: sellerAddFood, isPending, reset } = useSellerAddFood()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      id: storeId,
      name: data.name,
      image: data.image,
      price: data.price,
      quantity: data.quantity,
      type: data.type,
      description: data.description,
    }
    sellerAddFood(formData as AddFood, {
      onSuccess: () => {
        setShowCountdown(true)
        reset()
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-4 py-2">
        <AddFoodFormHeader />
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
            <AddFoodFormContents control={control} />
            <AddFoodFormFooter
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

export default AddFoodFormCard
