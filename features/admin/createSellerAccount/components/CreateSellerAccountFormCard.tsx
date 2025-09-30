import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, View } from 'react-native'
import { CreateSellerAccountRequest } from '@/utils/types'
import CreateSellerAccountHeader from './CreateSellerAccountHeader'
import CreateSellerAccountFormContents from './CreateSellerAccountFormContents'
import CreateSellerAccountFormFooter from './CreateSellerAccountFormFooter'
import Error from '@/components/parts/Error'
import CountDown from '@/components/parts/CountDown'
import { useCreateSellerAccount } from '@/hooks/useMutation/admin/useCreateSellerAccount'

const CreateSellerAccountFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm()
  const { mutate: createSellerAccount, isPending } = useCreateSellerAccount()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setErrorMessage(null)
    createSellerAccount(data as CreateSellerAccountRequest, {
      onSuccess: () => {
        setShowCountdown(true)
        reset()
      },
      onError: (error: any) => {
        console.error('Registration error:', error)
        const message =
          error?.message || 'Registration failed. Please try again.'
        setErrorMessage(message)
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
          {errorMessage && (
            <View className="bg-red-100 border border-red-400 rounded-lg p-4 mx-4">
              <Text className="text-red-700 text-center font-medium">
                {errorMessage}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default CreateSellerAccountFormCard
