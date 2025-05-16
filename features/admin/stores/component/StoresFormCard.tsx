import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StoresHeader from './StoresHeader'
import StoreFormContents from './StoreFormContents'
import { ScrollView } from 'react-native'

const StoresFormCard = () => {
  return (
    <SafeAreaView className="flex-1 p-3">
      <ScrollView showsVerticalScrollIndicator={false}>
        <StoresHeader />
        <StoreFormContents />
      </ScrollView>
    </SafeAreaView>
  )
}

export default StoresFormCard
