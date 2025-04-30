import React from 'react'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'

const ViewStore = () => {
  return (
    <ScreenLayout>
      <SafeAreaView className="flex-1 bg-emerald-50">
        <Typo>Test</Typo>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default ViewStore
