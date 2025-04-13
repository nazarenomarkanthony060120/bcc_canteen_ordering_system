import React, { useState } from 'react'
import RegisterFormContents from './RegisterFormContents'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import RegisterFormFooter from './RegisterFormFooter'
import { RegisterRequest } from '@/utils/types'
import RegisterFormHeader from './RegisterFormHeader'
import Error from '@/components/parts/Error'
import { ScrollView, View } from 'react-native'
import CountDown from '@/components/parts/CountDown'
import { userRegister } from '@/hooks/register'

const RegisterFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()
  const { mutate: register, error, isPending } = userRegister()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    register(data as RegisterRequest, {
      onSuccess: () => {
        setShowCountdown(true)
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
            route={'/(auth)/login'}
            message="You will be redirected to Login in"
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
    </ScrollView>
  )
}

export default RegisterFormCard
