import { View, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import DashboardWelcome from '../dashboardWelcome/DashboardWelcome'

interface DashboardSearchProps {
  children: React.ReactNode
}
const DashboardSearch = ({ children }: DashboardSearchProps) => {
  return (
    <View className='flex-1'>
      <DashboardWelcome />
      <View className="flex-row px-4 py-1 items-center bg-slate-200 justify-center w-full rounded-2xl border-2 border-gray-300 pr-6 mt-5">
        <TextInput className={'w-full placeholder:text-slate-400 text-center'} placeholder={'Search'} ></TextInput>
        <TouchableOpacity className='flex items-center'>
          <Icon name="search" size={20} color="gray" className='bg-white rounded-full p-2'/>
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1  gap-40" showsVerticalScrollIndicator={false} >
        <View className='flex gap-3'>
          {children}
        </View>
      </ScrollView>
    </View>
  )
}

export default DashboardSearch
