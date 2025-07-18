import { View } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form'
import Input from '@/components/common/input'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

interface RegisterFormContentsProps {
  control: Control<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

const RegisterFormContents = ({
  control,
  getValues,
}: RegisterFormContentsProps) => {
  return (
    <View className="gap-2 pt-11">
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Name is required',
          minLength: {
            value: 10,
            message: 'Name must be at least 10 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3 placeholder:text-slate-400 '}
            placeholder={'Name'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<Entypo name={'user'} size={20} color="#02bf15" />}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3 placeholder:text-slate-400 '}
            placeholder={'Email'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={
              <MaterialIcons
                name={'alternate-email'}
                size={20}
                color="#02bf15"
              />
            }
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3 placeholder:text-slate-400 '}
            placeholder={'Password'}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            isIconLeft
            icon={<MaterialIcons name={'key'} size={20} color="#02bf15" />}
            isPassword={true}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Confirm Password is required',
          validate: (value) =>
            value === getValues('password') || 'Passwords do not match',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3 placeholder:text-slate-400 '}
            placeholder={'Confirm Password'}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            isIconLeft
            icon={<MaterialIcons name={'key'} size={20} color="#02bf15" />}
            isPassword={true}
          />
        )}
      />
    </View>
  )
}

export default RegisterFormContents
