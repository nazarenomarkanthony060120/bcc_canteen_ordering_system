import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { useRouter } from 'expo-router'

interface RegisterActionContainerProps { 
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>,
  onSubmit: SubmitHandler<FieldValues>,
  isPending: boolean
}

const RegisterActionContainer = ({ handleSubmit, onSubmit, isPending }: RegisterActionContainerProps) => {
  return (
    <View className='gap-2 mb-32'>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className={'w-full flex-row bg-sky-300 p-5 rounded-2xl'}>
        <View className='flex-row justify-center items-center w-full'>
          { isPending ? <ActivityIndicator /> : <Text className={'uppercase font-[18]'}>Register</Text>}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default RegisterActionContainer