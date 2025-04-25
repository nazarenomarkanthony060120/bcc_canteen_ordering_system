import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StoreFormContents from './StoreFormContents'
import { Store } from '@/utils/types'
import { MasonryFlashList } from '@shopify/flash-list'

interface Props {
  stores: Store[] | undefined
}

const StoreListFormCard = ({ stores }: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 flex-1">
        <MasonryFlashList
          data={stores}
          estimatedItemSize={132}
          renderItem={({ item }) => <StoreFormContents store={item} />}
        />
      </SafeAreaView>
    </ScrollView>
  )
}

export default StoreListFormCard
