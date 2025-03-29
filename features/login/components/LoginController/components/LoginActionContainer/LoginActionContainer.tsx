import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

interface LoginActionContainerProps { 
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
  onSubmit: SubmitHandler<FieldValues>,
  isPending: boolean
}

const LoginActionContainer = ({ handleSubmit, onSubmit, isPending }: LoginActionContainerProps) => {
  return (
    <View className='gap-2 mb-32'>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className={'w-full flex-row bg-sky-300 p-5 rounded-2xl'}>
        <View className='flex-row justify-center items-center w-full'>
          { isPending ? <ActivityIndicator /> : <Text className={'uppercase font-[18]'}>Login</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className={'w-full flex-row bg-emerald-300 p-5 rounded-2xl'}>
            <View className='flex-row justify-center items-center w-full'>
              <Text className={'uppercase font-[18]'}>Register</Text>
            </View>
          </TouchableOpacity>
      <Typo className="text-right text-[15px] text-white">Forgot Password</Typo>
    </View>
  )
}

export default LoginActionContainer