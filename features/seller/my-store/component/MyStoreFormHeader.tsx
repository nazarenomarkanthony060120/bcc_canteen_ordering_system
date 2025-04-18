import { SafeAreaView } from 'react-native'
import React from 'react'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'

interface MyStoreFormHeaderProps {
  store: string | undefined
}

const MyStoreFormHeader = ({ store }: MyStoreFormHeaderProps) => {
  return (
    <SafeAreaView className="items-center justify-center gap-3 p-5">
      <ImageWrapper
        source={CANTEEN_IMAGE}
        style={{ height: 100, width: 140 }}
      />
      <Typo className="text-[34px] text-emerald-700 font-bold text-center">
        {store}
      </Typo>
    </SafeAreaView>
  )
}

export default MyStoreFormHeader
