import { SafeAreaView } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'

interface MyStoreFormHeaderProps {
  store: string | undefined
}

const MyStoreFormHeader = ({ store }: MyStoreFormHeaderProps) => {
  return (
    <SafeAreaView className="items-center justify-center">
      <Typo className="text-[34px] text-emerald-700 font-bold text-center">
        {store}
      </Typo>
    </SafeAreaView>
  )
}

export default MyStoreFormHeader
