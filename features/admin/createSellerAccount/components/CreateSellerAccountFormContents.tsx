import { View } from 'react-native'
import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form'
import Input from '@/components/common/input'
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface CreateSellerAccountFormContentsProps {
  control: Control<FieldValues>
  getValues: UseFormGetValues<FieldValues>
}

const CreateSellerAccountFormContents = ({
  control,
  getValues,
}: CreateSellerAccountFormContentsProps) => {
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
              value: 3,
              message: 'Name must be at least 3 characters',
            },
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: 'Name should only contain letters and spaces',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 placeholder:text-gray-400"
              placeholder="Enter full name"
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
        <Typo className="text-gray-700 font-medium mb-2">Address</Typo>
        <Controller
          control={control}
          name="address"
          rules={{
            required: 'Address is required',
            minLength: {
              value: 10,
              message: 'Address must be at least 10 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 placeholder:text-gray-400"
              placeholder="Enter complete address"
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
              placeholder="Enter phone number"
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
        <Typo className="text-gray-700 font-medium mb-2">Email</Typo>
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
              className="w-full py-3 placeholder:text-gray-400"
              placeholder="Enter email address"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              keyboardType="email-address"
              isIconLeft
              icon={
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color="#059669"
                />
              }
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Password</Typo>
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
              className="w-full py-3 placeholder:text-gray-400"
              placeholder="Enter password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              isIconLeft
              icon={<MaterialIcons name="key" size={20} color="#059669" />}
              isPassword={true}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Confirm Password</Typo>
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
              className="w-full py-3 placeholder:text-gray-400"
              placeholder="Confirm password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              isIconLeft
              icon={<MaterialIcons name="key" size={20} color="#059669" />}
              isPassword={true}
            />
          )}
        />
      </View>
    </View>
  )
}

export default CreateSellerAccountFormContents
