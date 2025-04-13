import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import Typo from '@/components/common/typo'
import { AntDesign } from '@expo/vector-icons'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'

const NewAddFoodList = () => {
  const data = [
    { id: 1, name: 'Pizza', price: 200, icon: CANTEEN_IMAGE },
    { id: 2, name: 'Cantoon', price: 20, icon: CANTEEN_IMAGE },
    { id: 3, name: 'Bingka', price: 10, icon: CANTEEN_IMAGE },
    { id: 4, name: 'Dinugoan', price: 15, icon: CANTEEN_IMAGE },
    { id: 5, name: 'Spagetti', price: 25, icon: CANTEEN_IMAGE },
    { id: 6, name: 'Sinigang', price: 60, icon: CANTEEN_IMAGE },
  ]

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-[47%] bg-gray-100 mb-4 rounded-xl gap-1 justify-center p-3"
            >
              <ImageWrapper
                className="items-center"
                source={item.icon}
                style={{ height: 60, width: 100 }}
              />
              <SafeAreaView className="items-start">
                <Typo className="text-sm mt-2 text-center">{item.name}</Typo>
                <Typo className="text-sm mt-2 text-center">
                  Php: {item.price}
                </Typo>
              </SafeAreaView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewAddFoodList
