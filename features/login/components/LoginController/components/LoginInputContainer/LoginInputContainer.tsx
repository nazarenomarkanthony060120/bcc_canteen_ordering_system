import { View, TextInput } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface LoginInputContainerProps {
  control: Control<FieldValues>
}

const LoginInputContainer = ({ control }: LoginInputContainerProps) => {
  return (
    <View className='gap-2 pt-11'>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row px-4 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
            <TextInput className={' w-full py-5 placeholder:text-slate-400 '} placeholder={'Email'} value={value} onChangeText={onChange}></TextInput>
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row px-4 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
            <TextInput className={' w-full py-5 placeholder:text-slate-400'} placeholder={'Password'} value={value} onChangeText={onChange} secureTextEntry></TextInput>
          </View>
        )}
      />
      
    </View>
  )
}

export default LoginInputContainer