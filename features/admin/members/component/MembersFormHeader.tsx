import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'

const MembersFormHeader = () => {
  return (
    <SafeAreaView className="items-center justify-center">
      <Typo className="text-[24px] text-emerald-700 font-bold text-center">
        Check and Verify the Users
      </Typo>
    </SafeAreaView>
  )
}

export default MembersFormHeader
