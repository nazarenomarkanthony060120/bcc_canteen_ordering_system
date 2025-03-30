import { View, Text } from 'react-native'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import RegisterInputContainer from '../registerInputContainer/RegisterInputContainer'
import Typo from '@/components/common/typo'
import RegisterActionContainer from '../registerActionContainer/RegisterActionContainer'
import { userRegister } from '@/hooks'
import { RegisterRequeset } from '@/utils/types'

const RegisterController = () => {
  const { control, handleSubmit } = useForm()
  const { mutate: register, error, isPending } = userRegister()
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    register(data as RegisterRequeset)
  }

  return (
    <View className='pt-6 px-5 gap-2'>
      <Typo className='text-white text-[24px] font-bold text-center'>Register</Typo>
      <RegisterInputContainer control={control}/>
      <RegisterActionContainer  handleSubmit={handleSubmit} isPending={isPending} onSubmit={onSubmit} />
      <Typo>{error && <Typo className='text-red'>{error.message}</Typo>}</Typo>
    </View>
  )
}

export default RegisterController