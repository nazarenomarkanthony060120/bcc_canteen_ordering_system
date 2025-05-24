import { View } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import Input from '@/components/common/input'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface StoreFormData {
  store: string
  address: string
}

interface AddStoreFormContentsProps {
  control: Control<FieldValues>
}

const AddStoreFormContents = ({ control }: AddStoreFormContentsProps) => {
  return (
    <View className="gap-6">
      <View>
        <Typo className="text-gray-700 font-medium mb-2">Store Name</Typo>
        <Controller
          control={control}
          name="store"
          rules={{
            required: 'Store name is required',
            minLength: {
              value: 5,
              message: 'Store name must be at least 5 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9\s-]+$/,
              message:
                'Store name can only contain letters, numbers, spaces, and hyphens',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 px-4 placeholder:text-gray-400"
              placeholder="Enter your store name"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<FontAwesome5 name="store" size={20} color="#059669" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Store Address</Typo>
        <Controller
          control={control}
          name="address"
          rules={{
            required: 'Store address is required',
            minLength: {
              value: 10,
              message: 'Address must be at least 10 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 px-4 placeholder:text-gray-400"
              placeholder="Enter your store's complete address"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<Entypo name="location" size={20} color="#059669" />}
            />
          )}
        />
      </View>
    </View>
  )
}

export default AddStoreFormContents
