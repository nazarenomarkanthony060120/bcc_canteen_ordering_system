import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { Picker } from "@react-native-picker/picker";
import { Eye, EyeOff } from 'lucide-react-native'
import Input from '@/components/common/input';
import Icon from '@/components/common/icon';
import IconMaterialUi from '@/components/common/iconMaterialUi';

interface LoginInputContainerProps {
  control: Control<FieldValues>
}


const RegisterInputContainer = ({ control }: LoginInputContainerProps) => {

  return (
    <View className='gap-2 pt-4'>
      <Controller
        control={control}
        name="id"
        rules={{ required: 'Id is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className={' w-full py-3 placeholder:text-slate-400 '} placeholder={'ID'} value={value} onChangeText={onChange} icon={<Icon name={'idcard'} size={20} color="gray"/>} />
        )}
      />
      <Controller
        control={control}
        name="fullName"
        rules={{ required: 'Fullname is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className={' w-full py-3 placeholder:text-slate-400 '} placeholder={'Fullname'} value={value} onChangeText={onChange}  icon={<Icon name={'user'} size={20} color="gray"/>} />
        )}
      />
      <Controller
        control={control}
        name="gradeAndSection"
        rules={{ required: 'Grade and Section is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className={' w-full py-3 placeholder:text-slate-400 '} placeholder={'Grade and Section e.g. 11-A'} value={value} onChangeText={onChange} icon={<IconMaterialUi name={'grade'} size={20} color="gray"/>} />
        )}
      />
      <Controller
        control={control}
        name="type"
        rules={{ required: 'Type is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row px-4 items-center bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
            <IconMaterialUi name={'category'} size={20} color="gray"/>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{ flex: 1, height: 50 }}
              className='w-full py-3 placeholder:text-slate-400 '
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
          <Input className={' w-full py-3 placeholder:text-slate-400 '} placeholder={'Phone number'} value={value} onChangeText={onChange} icon={<Icon name={'phone'} size={20} color="gray"/>} />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className={' w-full py-3 placeholder:text-slate-400 '} placeholder={'Email'} value={value} onChangeText={onChange} icon={<IconMaterialUi name={'alternate-email'} size={20} color="gray"/>} />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <Input className={' w-full py-3 placeholder:text-slate-400 '} placeholder={'Password'} value={value} onChangeText={onChange} secureTextEntry icon={<IconMaterialUi name={'key'} size={20} color="gray"/>} isPassword={true}/>
        )}
      />
      
    </View>
  )
}

export default RegisterInputContainer