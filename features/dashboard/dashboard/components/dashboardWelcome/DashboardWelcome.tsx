import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/auth'

const DashboardWelcome = () => {
  const { user } = useContext(AuthContext) 
  return (
    <View className='gap-4'>
      <Text className={'text-white text-md'}>Welcome Back: {user?.email}</Text>
      <Text className={'text-white  text-xl'}>Order your snacks now!</Text>
    </View>
  )
}

export default DashboardWelcome