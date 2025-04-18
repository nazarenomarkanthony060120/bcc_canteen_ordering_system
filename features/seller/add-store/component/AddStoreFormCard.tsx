import { ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/context/auth'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { CreateStore } from '@/utils/types'
import CountDown from '@/components/parts/CountDown'
import Error from '@/components/parts/Error'
import AddStoreFormHeader from './AddStoreFormHeader'
import AddStoreFormFooter from './AddStoreFormFooter'
import AddStoreFormContents from './AddStoreFormContents'
import { useCreateStore } from '@/hooks/seller/store/useCreateStore'

const AddStoreFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const auth = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { mutate: userCreateStore, isPending } = useCreateStore()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsCreate(true)
    const formData = {
      userId: auth.user?.uid,
      store: data.store,
      address: data.address,
    }
    userCreateStore(formData as CreateStore, {
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
        <AddStoreFormHeader />
        {showCountdown && (
          <CountDown
            time={5}
            route={'/screens/(seller)/dashboard/store'}
            message="You will be redirected to your store in"
          />
        )}
        <AddStoreFormContents control={control} />
        <AddStoreFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
          isCreate={isCreate}
        />
      </SafeAreaView>
      {Object.keys(errors).length > 0 && <Error errors={errors} />}
    </ScrollView>
  )
}

export default AddStoreFormCard
