import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { useRouter } from 'expo-router'
import Button from '@/components/common/button'

interface LoginActionContainerProps { 
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
  onSubmit: SubmitHandler<FieldValues>,
  isPending: boolean
}

const LoginActionContainer = ({ handleSubmit, onSubmit, isPending }: LoginActionContainerProps) => {
  const router = useRouter()
  
  const navigateToRegister = () => {
    router.replace('/screens/register')
  }
  return (
    <View className='gap-2 mb-32'>
      <Button className='w-full flex-row bg-sky-300 p-5 rounded-2xl' onPress={handleSubmit(onSubmit)} loading={isPending}>Login</Button>
      <Button className='w-full flex-row bg-emerald-300 p-5 rounded-2xl' onPress={navigateToRegister}>Register</Button>
      <Typo className="text-right text-[15px] text-white">Forgot Password</Typo>
    </View>
  )
}

export default LoginActionContainer