import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/components/common/input'
import { AntDesign } from '@expo/vector-icons'
import PopularFood from '@/features/common/popularFood/PopularFood'
import StoreCategory from '@/features/common/storeCategory/StoreCategory'
import NewlyAddFood from '@/features/common/newlyAddFood/NewlyAddFood'
import Seller from '../Seller'

const Dashboard = () => {
  return (
    <Seller className="flex-1 bg-emerald-300 justify-between">
      <SafeAreaView className="p-7">
        <Input
          className="text-center"
          placeholder="Search for restaurant and food"
          icon={<AntDesign name="search1" size={24} color="black" />}
          isIconRight
        />
      </SafeAreaView>
      <ScrollView
        className="flex gap-10 rounded-tl-[45px] rounded-tr-[45px] bg-white p-7"
        showsVerticalScrollIndicator={false}
      >
        <StoreCategory />
        <PopularFood />
        <NewlyAddFood />
      </ScrollView>
    </Seller>
  )
}

export default Dashboard
