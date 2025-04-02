import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { InputProps } from '@/utils/types'
import { Eye, EyeOff } from 'lucide-react-native'

const Input = (props: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  return (
    <View className="flex-row px-4 py-1 items-center gap-2 bg-slate-200 w-full rounded-2xl border-2 border-gray-300 relative">
      {props.icon && props.icon}
      <TextInput className={props.className} placeholder={props.placeholder} secureTextEntry={!isPasswordVisible} value={props.value} onChangeText={props.onChangeText} style={{ flex: 1 }} />
      {
        props.isPassword && (
          <TouchableOpacity onPress={() => setIsPasswordVisible((prev) => !prev)} className="absolute right-5">
            {isPasswordVisible ? <Eye size={24} color="gray" /> : <EyeOff size={24} color="gray" />}
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default Input
