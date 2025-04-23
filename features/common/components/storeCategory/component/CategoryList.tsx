import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { Store } from '@/utils/types'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface CategoryListProps {
  store: Store
}

const CategoryList = ({ store }: CategoryListProps) => {
  return (
    <View
      key={store.id}
      className="w-32 h-24 rounded-lg mr-1 items-center gap-3 justify-center"
    >
      <ImageWrapper source={CANTEEN_IMAGE} style={{ height: 60, width: 100 }} />
      <Text className="font-bold">{store.store}</Text>
    </View>
  )
}

export default CategoryList
