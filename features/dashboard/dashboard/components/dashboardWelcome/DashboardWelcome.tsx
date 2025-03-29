import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/auth'
import DashboardProfile from '../dashboardProfile/DashboardProfile'
import DashboardLogout from '../dashboardLogout/DashboardLogout'

const DashboardWelcome = () => {
  const { user } = useContext(AuthContext) 
  return (
    <View className='gap-4'>
      <View className='flex flex-row justify-between'>
        <DashboardProfile />
        <DashboardLogout />
      </View>
      <Text className={'text-white text-md'}>Welcome Back: {user?.email}</Text>
      <Text className={'text-white  text-xl'}>Order your snacks now!</Text>
    </View>
  )
}

export default DashboardWelcome