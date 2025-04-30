import { View } from 'react-native'
import React from 'react'
import { Food, Store } from '@/utils/types'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import ViewStoreFood from './ViewStoreFood'

interface ViewStoreFormCardProps {
  foods: Food[] | null | undefined
  store: Store | null | undefined
}

const ViewStoreFormCard = ({ foods, store }: ViewStoreFormCardProps) => {
  return (
    <View className="flex-1 ">
      <View className="gap-4 mb-5">
        <ImageWrapper
          source={CANTEEN_IMAGE}
          className="items-center"
          style={{ height: 150, width: 150 }}
        />
        <Typo className="text-xl font-semibold">{store?.store}</Typo>
      </View>
      <ViewStoreFood foods={foods} />
    </View>
  )
}

export default ViewStoreFormCard
