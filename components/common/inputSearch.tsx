import { View, TextInput, TextInputProps } from 'react-native'
import React from 'react'

interface InputSearchProps extends TextInputProps {
  icon?: React.ReactNode
  className?: string
  isIconRight?: boolean
}

const InputSearch = ({
  isIconRight = false,
  icon,
  className,
  placeholder,
  value,
  onChangeText,
}: InputSearchProps) => {
  return (
    <View className="flex-row px-4 py-1 items-center gap-2 bg-slate-100 w-full rounded-2xl border-2 border-emerald-600 placeholder:text-red-600 relative">
      <TextInput
        className={className}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {isIconRight && icon && icon}
    </View>
  )
}

export default InputSearch
