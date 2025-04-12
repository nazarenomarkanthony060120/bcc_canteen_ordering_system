import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native'

const CategoryList = () => {
  const data = [
    {
      id: 1,
      name: 'Canteen 1',
      icon: CANTEEN_IMAGE,
    },
    {
      id: 2,
      name: 'Canteen 2',
      icon: CANTEEN_IMAGE,
    },
    {
      id: 3,
      name: 'Canteen 3',
      icon: CANTEEN_IMAGE,
    },
    {
      id: 4,
      name: 'Canteen 4',
      icon: CANTEEN_IMAGE,
    },
    {
      id: 5,
      name: 'Canteen 5',
      icon: CANTEEN_IMAGE,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="px-2"
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="w-32 h-24 p-2 rounded-lg mr-1 items-center justify-center"
          >
            <ImageWrapper
              source={item.icon}
              style={{ height: 60, width: 100 }}
            />
            <Text className="font-bold">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CategoryList
