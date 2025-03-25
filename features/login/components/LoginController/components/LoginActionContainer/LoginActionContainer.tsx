import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '@/components/button'
import Typo from '@/components/typo'
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoginActionContainerProps { 
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
  onSubmit: SubmitHandler<FieldValues>,
  isPending: boolean
}

const LoginActionContainer = ({ handleSubmit, onSubmit, isPending }: LoginActionContainerProps) => {
  return (
    <SafeAreaView className=''>
      <View className='gap-2 mb-32'>
        <Button className='w-full flex-row bg-sky-300 p-5 rounded-2xl' onPress={handleSubmit(onSubmit)} loading={isPending}>Login</Button>
        <Typo className="text-right text-white">Forgot Password</Typo>
      </View>
      <Button className='w-full flex-row bg-emerald-300 p-5 rounded-2xl' onPress={handleSubmit(onSubmit)} loading={isPending}>Register Here</Button>
    </SafeAreaView>
  )
}

export default LoginActionContainer