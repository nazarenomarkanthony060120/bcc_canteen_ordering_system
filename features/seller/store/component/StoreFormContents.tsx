import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Store, StoreStatus, StoreStatusText } from '@/utils/types'
import { Timestamp } from 'firebase/firestore'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

interface StoreFormContentsProps {
  store: Store
}

const getStoreStatus = (status: number) => {
  switch (status) {
    case StoreStatus.APPLIED:
      return (
        <Text className="font-bold text-[#00f]">{StoreStatusText.APPLIED}</Text>
      )
    case StoreStatus.PENDING:
      return (
        <Text className="font-bold text-[#ff0]">{StoreStatusText.PENDING}</Text>
      )
    case StoreStatus.APPROVED:
      return (
        <Text className="font-bold text-[#0f0]">
          {StoreStatusText.APPROVED}
        </Text>
      )
    case StoreStatus.REJECTED:
      return (
        <Text className="font-bold text-[#f00]">
          {StoreStatusText.REJECTED}
        </Text>
      )
    default:
      return StoreStatusText.UNKWON
  }
}

const StoreFormContents = ({ store }: StoreFormContentsProps) => {
  const router = useRouter()

  const navigateToMyStore = () => {
    router.push(`/screens/(seller)/my-store/myStore?storeId=${store.id}`)
  }

  return (
    <TouchableOpacity onPress={navigateToMyStore}>
      <LinearGradient
        colors={['#33cccc', '#6666ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-row items-center  gap-5 p-5 mt-3"
      >
        <ImageWrapper
          source={CANTEEN_IMAGE}
          style={{ height: 80, width: 100 }}
        />
        <View className="gap-1">
          <Text className="text-white">Store Name: {store.store}</Text>
          <Text className="text-white">
            Status: {getStoreStatus(store.status)}
          </Text>
          <Text className="text-white">
            Date Created:{' '}
            {createdAtFormatted(store.createdAt as Timestamp)}{' '}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default StoreFormContents
