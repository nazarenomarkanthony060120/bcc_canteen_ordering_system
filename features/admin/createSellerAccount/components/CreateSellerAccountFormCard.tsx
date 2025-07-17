import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View } from 'react-native'
import { CreateSellerAccountRequest } from '@/utils/types'
import CreateSellerAccountHeader from './CreateSellerAccountHeader'
import CreateSellerAccountFormContents from './CreateSellerAccountFormContents'
import CreateSellerAccountFormFooter from './CreateSellerAccountFormFooter'
import Error from '@/components/parts/Error'
import CountDown from '@/components/parts/CountDown'
import { useCreateSellerAccount } from '@/hooks/useMutation/admin/useCreateSellerAccount'

const CreateSellerAccountFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm()
  const { mutate: createSellerAccount, isPending } = useCreateSellerAccount()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createSellerAccount(data as CreateSellerAccountRequest, {
      onSuccess: () => {
        setShowCountdown(true)
        reset()
      },
      onError: (error) => {
        console.error('Seller account creation failed:', error)
      },
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="items-center w-full">
        <View className="w-full max-w-md bg-white/10 rounded-3xl p-4 shadow-lg border border-white/20">
          <CreateSellerAccountHeader />
          {showCountdown && (
            <View className="mb-4">
              <CountDown
                time={3}
                route={'/screens/(admin)/dashboard/dashboard'}
                message="Seller account created successfully! Redirecting to dashboard..."
              />
            </View>
          )}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/30 p-6">
            <CreateSellerAccountFormContents
              control={control}
              getValues={getValues}
            />
            <CreateSellerAccountFormFooter
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              isPending={isPending}
            />
          </View>
          {Object.keys(errors).length > 0 && (
            <View className="mt-4">
              <Error errors={errors} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default CreateSellerAccountFormCard
