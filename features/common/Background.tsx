import { View, Text, ScrollViewComponent, ScrollView } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'

const Background = ({ children, header }: { children: React.ReactNode, header: string}) => {
  return (
    <View className='flex-1'>
      <ScrollView className="flex-1 bg-slate-900 gap-40 p-5">
        <Typo className='text-2xl font-bold text-white text-center mb-5'>{header}</Typo>
        <View className='flex gap-3'>
          {children}
        </View>
      </ScrollView>
    </View>
  )
}

export default Background