import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { Picker } from "@react-native-picker/picker";
import { Eye, EyeOff } from 'lucide-react-native'

interface LoginInputContainerProps {
  control: Control<FieldValues>
}


const RegisterInputContainer = ({ control }: LoginInputContainerProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View className='gap-2 pt-8'>
      <Controller
        control={control}
        name="id"
        rules={{ required: 'Id is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row px-4 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
            <TextInput className={' w-full py-5 placeholder:text-slate-400 '} placeholder={'ID'} value={value} onChangeText={onChange}></TextInput>
          </View>
        )}
      />
      <Controller
        control={control}
        name="fullName"
        rules={{ required: 'Fullname is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row px-4 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
            <TextInput className={' w-full py-5 placeholder:text-slate-400 '} placeholder={'Fullname'} value={value} onChangeText={onChange}></TextInput>
          </View>
        )}
      />
      <Controller
        control={control}
        name="gradeAndSection"
        rules={{ required: 'Grade and Section is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row px-4 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
            <TextInput className={' w-full py-5 placeholder:text-slate-400 '} placeholder={'Grade and Section e.g. 11-A'} value={value} onChangeText={onChange}></TextInput>
          </View>
        )}
      />
      <Controller
        control={control}
        name="type"
        rules={{ required: 'Type is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row px-4 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{ flex: 1, height: 50 }}
              className='w-full py-5 placeholder:text-slate-400 '
            >
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Student" value="student" />
              <Picker.Item label="Teacher" value="teacher" />
              <Picker.Item label="Other" value="other" />
              <Picker.Item label="Seller" value="seller" />
            </Picker>
          </View>
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        rules={{ required: 'Phone Number is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row px-4 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
            <TextInput className={' w-full py-5 placeholder:text-slate-400 '} placeholder={'Phone number'} value={value} onChangeText={onChange}></TextInput>
          </View>
        )}
      />
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
        <View className="flex-row items-center px-4 bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
          <TextInput
            className="flex-1 py-5 placeholder:text-slate-400"
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <EyeOff size={24} color="gray" /> : <Eye size={24} color="gray" />}
          </TouchableOpacity>
        </View>
      )}
    />
      
    </View>
  )
}

export default RegisterInputContainer