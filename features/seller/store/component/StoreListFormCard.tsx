import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StoreFormContents from './StoreFormContents'
import { Store } from '@/utils/types'

interface Props {
  stores: Store[] | undefined
}

const StoreListFormCard = ({ stores }: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 flex-1">
        {stores?.map((store) => (
          <StoreFormContents key={store.id} store={store} />
        ))}
      </SafeAreaView>
    </ScrollView>
  )
}

export default StoreListFormCard
