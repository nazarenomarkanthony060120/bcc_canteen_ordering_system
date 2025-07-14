import React, { useState } from 'react'
import RegisterFormContents from './RegisterFormContents'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import RegisterFormFooter from './RegisterFormFooter'
import { RegisterRequest } from '@/utils/types'
import RegisterFormHeader from './RegisterFormHeader'
import Error from '@/components/parts/Error'
import { ScrollView } from 'react-native'
import CountDown from '@/components/parts/CountDown'
import { useUserRegister } from '@/hooks/useMutation/register/useUserRegister'

const RegisterFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()
  const { mutate: register, isPending } = useUserRegister()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    register(data as RegisterRequest, {
      onSuccess: () => {
        setShowCountdown(true)
      },
      onError: (error) => {
        console.error('Registration error:', error)
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
    </ScrollView>
  )
}

export default RegisterFormCard
