import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ImageWrapper from '@/components/parts/Image'
import TitleWrapper from '@/components/parts/Title'
import { useRouter } from 'expo-router'

const DashboardShopSales = () => {
  const router = useRouter()

  return (
    <View className='relative rounded-2xl bg-black overflow-hidden' style={{ height: hp(25), width: wp(43) }}>
      <TouchableOpacity onPress={() => router.navigate('/screens/(admin)/(food)/foods?id=123&page=1')}>
        <ImageWrapper source={require("@/assets/images/logo.jpeg")} style={{ width: "100%", height: "100%", borderRadius: 10 }}  resizeMode='cover'/>
        <TitleWrapper />
        <View className='absolute bottom-0 w-full bg-black/50 py-2'>
          <Text className='text-center text-white font-bold'>Shop Name</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default DashboardShopSales
