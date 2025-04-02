import { TouchableOpacity } from 'react-native'
import React from 'react'
import { IconProps } from '@/utils/types'
import { MaterialIcons } from '@expo/vector-icons'

const IconMaterialUi = ({ className, name, size, color }: IconProps) => {
  return (
    <TouchableOpacity className={className}>
      <MaterialIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}

export default IconMaterialUi