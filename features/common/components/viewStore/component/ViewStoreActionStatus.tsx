import { Text } from 'react-native'
import React from 'react'
import { StoreStatus } from '@/utils/types'

interface ViewStoreActionStatusProps {
  storeId: string | undefined
  status: StoreStatus | undefined
}

const ViewStoreActionStatus = ({
  storeId,
  status,
}: ViewStoreActionStatusProps) => {
  if (status === StoreStatus.APPROVED) return <Text>Approved</Text>
  if (status === StoreStatus.APPLIED) return <Text>Applied</Text>
  if (status === StoreStatus.PENDING) return <Text>Pending</Text>
  if (status === StoreStatus.REJECTED) return <Text>Rejected</Text>
}

export default ViewStoreActionStatus
