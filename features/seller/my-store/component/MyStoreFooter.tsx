import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'

const MyStoreFooter = () => {
  return (
    <SafeAreaView className="gap-3 mb-10">
      <Button className="bg-cyan-400 items-center rounded-3xl p-5">
        <Typo className="text-white">Add Food</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default MyStoreFooter
