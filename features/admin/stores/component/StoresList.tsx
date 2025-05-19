import { View, Text } from 'react-native'
import React from 'react'
import { Store } from '@/utils/types'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import Typo from '@/components/common/typo'
import { getStoreStatus } from '@/features/common/parts/getStoreStatus'
import { getStoreStatusColor } from '@/features/common/parts/getStoreStatusColor'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { Timestamp } from 'firebase/firestore'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'

interface StoresListProps {
  store: Store
}

const StoresList = ({ store }: StoresListProps) => {
  const { data: storeOwner, isLoading } = useGetUserByUserId({
    id: store.userId,
  })

  return (
    <View className="bg-white rounded-2xl flex-row shadow-md mb-2 p-5 gap-5 items-center space-x-4">
      <ImageWrapper
        source={CANTEEN_IMAGE}
        className="items-center"
        style={{ height: 150, width: 150 }}
      />
      <View className="flex-col items-start gap-5">
        <View className="items-start">
          <Typo>{store.store}</Typo>
          <Text style={{ color: getStoreStatusColor(store.status).color }}>
            {getStoreStatus(store.status)}
          </Text>
          <Typo>
            Applied:
            {createdAtFormatted(store.updatedAt as unknown as Timestamp)}
          </Typo>
        </View>

        <View className="items-start">
          <Typo>{storeOwner?.name}</Typo>
          <Typo>{storeOwner?.type}</Typo>
        </View>
      </View>
    </View>
  )
}

export default StoresList
