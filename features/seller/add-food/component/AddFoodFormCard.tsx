import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import AddFoodFormContents from './AddFoodFormContents'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/context/auth'
import { useUserKYCRegister } from '@/hooks/common/useUserKYCRegister'
import { UserKYC } from '@/utils/types'
import Error from '@/components/parts/Error'
import { ScrollView } from 'react-native'
import AddFoodFormHeader from './AddFoodFormHeader'
import AddFoodFormFooter from './AddFoodFormFooter'

const AddFoodFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const auth = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { mutate: userKycRegister, isPending } = useUserKYCRegister()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      id: auth.user?.uid,
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
      birthDate: data.birthDate,
    }
    userKycRegister(formData as UserKYC, {
      onSuccess: () => {
        setShowCountdown(true)
      },
    })
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 p-5">
        <AddFoodFormHeader />
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
