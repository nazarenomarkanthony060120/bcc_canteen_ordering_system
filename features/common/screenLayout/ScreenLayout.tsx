import { View, Text } from 'react-native'
import React from 'react'

interface ScreenLayoutProps {
  children: React.ReactNode
}

const ScreenLayout = ({ children }: ScreenLayoutProps) => {
  return (
    <View>
      <Text>ScreenLayout</Text>
      {children}
    </View>
  )
}

export default ScreenLayout
