import { StoreStatus, StoreStatusText } from '@/utils/types'

export const getStoreStatus = (status: number) => {
  switch (status) {
    case StoreStatus.APPLIED:
      return StoreStatusText.APPLIED
    case StoreStatus.PENDING:
      return StoreStatusText.PENDING
    case StoreStatus.APPROVED:
      return StoreStatusText.APPROVED
    case StoreStatus.REJECTED:
      return StoreStatusText.REJECTED
    case StoreStatus.DISABLED:
      return StoreStatusText.DISABLED
    default:
      return StoreStatusText.UNKWON
  }
}
