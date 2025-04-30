import React from 'react'
import { MasonryFlashList } from '@shopify/flash-list'
import { Food } from '@/utils/types'
import ViewStoreFoodLists from './ViewStoreFoodLists'
import Typo from '@/components/common/typo'

interface ViewStoreFoodProps {
  foods: Food[] | null | undefined
}

const ViewStoreFood = ({ foods }: ViewStoreFoodProps) => {
  if (foods?.length === 0) return <Typo>You Don't have any foods yet.</Typo>

  return (
    <MasonryFlashList
      data={foods}
      estimatedItemSize={136}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ViewStoreFoodLists food={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

export default ViewStoreFood
