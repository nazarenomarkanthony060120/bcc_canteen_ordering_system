import { View } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form'
import Input from '@/components/common/input'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import { UserType } from '@/utils/types'

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
        name="id"
        rules={{
          required: 'ID is required',
          minLength: { value: 5, message: 'ID must be at least 5 characters' },
        }}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'ID'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            error={errors.root?.message}
            isIconLeft
            icon={<AntDesign name={'idcard'} size={20} color="#02bf15" />}
          />
        )}
      />
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
            className={'w-full py-3  placeholder:text-slate-400 '}
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
        name="type"
        rules={{
          required: 'Type is required',
          validate: (value) =>
            [
              UserType.SELLER,
              UserType.STUDENT,
              UserType.TEACHER,
              UserType.OUTSIDER,
            ].includes(value.trim())
              ? true
              : 'Type must be one of: Seller, Student, Teacher, Outsider',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Ex: [ Student | Teacher | Seller | Outsider ]'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<MaterialIcons name={'category'} size={20} color="#02bf15" />}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
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
            value: 6,
            message: 'Password must be at least 6 characters',
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
