import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { Store } from '@/utils/types'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text } from 'react-native'

interface CategoryListProps {
  store: Store
}

const CategoryList = ({ store }: CategoryListProps) => {
  const router = useRouter()

  const navigateToViewStore = () => {
    router.push('/screens/common/viewStore')
  }

  return (
    <Pressable
      key={store.id}
      onPress={navigateToViewStore}
      className="w-32 h-24 rounded-lg mr-1 items-center gap-3 justify-center"
    >
      <ImageWrapper source={CANTEEN_IMAGE} style={{ height: 60, width: 100 }} />
      <Text className="font-bold">{store.store}</Text>
    </Pressable>
  )
}

export default CategoryList
