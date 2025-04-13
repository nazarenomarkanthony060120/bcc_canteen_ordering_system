import { View, Text } from 'react-native'
import React from 'react'
import { Store, StoreStatus, StoreStatusText } from '@/utils/types'
import { Timestamp } from 'firebase/firestore'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'

interface StoreFormContentsProps {
  store: Store
}

const getStoreStatus = (status: number) => {
  switch (status) {
    case StoreStatus.APPLIED:
      return StoreStatusText.APPLIED
    case StoreStatus.PENDING:
      return StoreStatusText.PENDING
    case StoreStatus.APPROVED:
      return StoreStatusText.APPROVED
    case StoreStatus.REJECTED:
      return StoreStatusText.REJECTED
    default:
      return StoreStatusText.UNKWON
  }
}

const StoreFormContents = ({ store }: StoreFormContentsProps) => {
  return (
    <View className="bg-[#ccffcc] rounded-3xl p-5">
      <Text>Store Name: {store.store}</Text>
      <Text>Status: {getStoreStatus(store.status)}</Text>
      <Text>
        Date Created: {createdAtFormatted(store.createdAt as Timestamp)}{' '}
      </Text>
    </View>
  )
}

export default StoreFormContents
