import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import AddFoodFormContents from './AddFoodFormContents'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddFood } from '@/utils/types'
import Error from '@/components/parts/Error'
import { ScrollView } from 'react-native'
import AddFoodFormHeader from './AddFoodFormHeader'
import AddFoodFormFooter from './AddFoodFormFooter'
import { useSellerAddFood } from '@/hooks/(seller)/add-food/useSellerAddFood'
import CountDown from '@/components/parts/CountDown'

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
  const { mutate: sellerAddFood, isPending } = useSellerAddFood()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      id: storeId,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      type: data.type,
      description: data.description,
    }
    sellerAddFood(formData as AddFood, {
      onSuccess: () => {
        setShowCountdown(true)
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 p-5">
        <AddFoodFormHeader />
        {showCountdown && (
          <CountDown
            time={5}
            route={`/screens/(seller)/my-store/myStore?storeId=${storeId}`}
            message="You will be redirected to your Store"
          />
        )}
        <AddFoodFormContents control={control} />
        <AddFoodFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </SafeAreaView>
      {Object.keys(errors).length > 0 && <Error errors={errors} />}
    </ScrollView>
  )
}

export default AddFoodFormCard
