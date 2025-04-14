import { View } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form'
import Input from '@/components/common/input'
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons'

interface KYCFormContentsProps {
  control: Control<FieldValues>
}

const KYCFormContents = ({ control }: KYCFormContentsProps) => {
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
        name="phoneNumber"
        rules={{ required: 'Phone number is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Phone Number'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            keyboardType="numeric"
            isIconLeft
            icon={<AntDesign name={'phone'} size={20} color="#02bf15" />}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        rules={{ required: 'Address is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Address'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<Entypo name={'location'} size={20} color="#02bf15" />}
          />
        )}
      />
      <Controller
        control={control}
        name="birthDate"
        rules={{ required: 'Birth Date is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Month - Day - Year'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            keyboardType="numeric"
            isIconLeft
            icon={
              <FontAwesome name={'birthday-cake'} size={20} color="#02bf15" />
            }
          />
        )}
      />
    </View>
  )
}

export default KYCFormContents
