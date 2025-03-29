import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { InputProps } from '@/utils/types'


const Input = (props: InputProps) => {
  return (
    <View className="flex-row px-4 py-1 items-center bg-slate-200 w-full rounded-2xl border-2 border-gray-300">
      <TextInput className={props.className} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} value={props.value} onChangeText={props.onChangeText}></TextInput>
      { props.icon && props.icon }
    </View>
  )
}

export default Input