import { View } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import Input from '@/components/common/input'
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface KYCFormContentsProps {
  control: Control<FieldValues>
}

const KYCFormContents = ({ control }: KYCFormContentsProps) => {
  return (
    <View className="gap-6">
      <View>
        <Typo className="text-gray-700 font-medium mb-2">Full Name</Typo>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 7,
              message: 'Name must be at least 7 characters',
            },
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: 'Name should only contain letters and spaces',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 uppercase placeholder:text-gray-400"
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<Entypo name="user" size={20} color="#059669" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Phone Number</Typo>
        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{11}$/,
              message: 'Please enter a valid 11-digit phone number',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 placeholder:text-gray-400"
              placeholder="Enter your phone number"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              keyboardType="numeric"
              isIconLeft
              icon={<AntDesign name="phone" size={20} color="#059669" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Address</Typo>
        <Controller
          control={control}
          name="address"
          rules={{
            required: 'Address is required',
            minLength: {
              value: 7,
              message: 'Address must be at least 7 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 uppercase placeholder:text-gray-400"
              placeholder="Enter your complete address"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<Entypo name="location" size={20} color="#059669" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Birth Date</Typo>
        <Controller
          control={control}
          name="birthDate"
          rules={{
            required: 'Birth date is required',
            pattern: {
              value: /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d{2}$/,
              message: 'Please enter a valid date in MM-DD-YYYY format',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 placeholder:text-gray-400"
              placeholder="MM-DD-YYYY"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              keyboardType="numeric"
              isIconLeft
              icon={
                <FontAwesome name="birthday-cake" size={20} color="#059669" />
              }
            />
          )}
        />
      </View>
    </View>
  )
}

export default KYCFormContents
