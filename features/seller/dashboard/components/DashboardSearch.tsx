import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import InputSearch from '@/components/common/inputSearch'

const DashboardSearch = () => {
  return (
    <SafeAreaView className="p-5">
      <InputSearch
        className="text-center flex-1"
        placeholder="Search for restaurant and food"
        icon={<AntDesign name="search1" size={24} color="black" />}
        isIconRight
      />
    </SafeAreaView>
  )
}

export default DashboardSearch
