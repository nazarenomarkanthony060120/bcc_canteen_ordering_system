import { View, Text } from 'react-native'
import React from 'react'

const DashboardWelcome = () => {
  return (
    <View className="gap-4">
      <Text className={'text-white text-md'}>Welcome Back:</Text>
      <Text className={'text-white  text-xl'}>Order your snacks now!</Text>
    </View>
  )
}

export default DashboardWelcome
