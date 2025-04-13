import { View } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form'
import Input from '@/components/common/input'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'

interface AddStoreFormContentsProps {
  control: Control<FieldValues>
}

const AddStoreFormContents = ({ control }: AddStoreFormContentsProps) => {
  return (
    <View className="gap-2 pt-11">
      <Controller
        control={control}
        name="store"
        rules={{
          required: 'Storer Name is required',
          minLength: {
            value: 5,
            message: 'Store Name must be at least 5 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Store Name'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<FontAwesome5 name={'store'} size={20} color="#02bf15" />}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        rules={{ required: 'Store Address is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Store Address'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<Entypo name={'location'} size={20} color="#02bf15" />}
          />
        )}
      />
    </View>
  )
}

export default AddStoreFormContents
