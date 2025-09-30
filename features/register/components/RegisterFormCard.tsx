import React, { useState } from 'react'
import RegisterFormContents from './RegisterFormContents'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import RegisterFormFooter from './RegisterFormFooter'
import { RegisterRequest } from '@/utils/types'
import RegisterFormHeader from './RegisterFormHeader'
import Error from '@/components/parts/Error'
import { ScrollView, Alert, Text, View } from 'react-native'
import CountDown from '@/components/parts/CountDown'
import { useUserRegister } from '@/hooks/useMutation/register/useUserRegister'

const RegisterFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()
  const { mutate: register, isPending } = useUserRegister()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setErrorMessage(null) // Clear previous errors
    register(data as RegisterRequest, {
      onSuccess: () => {
        setShowCountdown(true)
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
      <SafeAreaView className="gap-2">
        <RegisterFormHeader />
        {showCountdown && (
          <CountDown
            time={5}
            route={'/screens/(customer)/dashboard/dashboard'}
            message="You will be redirected to Dashboard"
          />
        )}
        <RegisterFormContents control={control} getValues={getValues} />
        <RegisterFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </SafeAreaView>

      {Object.keys(errors).length > 0 && <Error errors={errors} />}
      {errorMessage && (
        <View className="bg-red-100 border border-red-400 rounded-lg p-4 mx-4">
          <Text className="text-red-700 text-center font-medium">
            {errorMessage}
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

export default RegisterFormCard
