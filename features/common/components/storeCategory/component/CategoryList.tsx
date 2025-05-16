import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { Store } from '@/utils/types'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'

interface CategoryListProps {
  store: Store
}

const CategoryList = ({ store }: CategoryListProps) => {
  const router = useRouter()

  const navigateToViewStore = () => {
    router.push(`/screens/common/viewStore?storeId=${store.id}`)
  }

  return (
    <Pressable
      key={store.id}
      onPress={navigateToViewStore}
      className="bg-white m-2 p-4 rounded-lg shadow gap-2"
    >
      <ImageWrapper source={CANTEEN_IMAGE} style={{ height: 60, width: 100 }} />
      <Typo className="text-sm">{store.store}</Typo>
    </Pressable>
  )
}

export default CategoryList
