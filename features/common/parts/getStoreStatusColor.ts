import { StoreStatus } from '@/utils/types'

export const getStoreStatusColor = (status: number) => {
  switch (status) {
    case StoreStatus.APPLIED:
      return { color: '#00f' }
    case StoreStatus.PENDING:
      return { color: '#e407e8' }
    case StoreStatus.APPROVED:
      return { color: '#17bf41' }
    case StoreStatus.REJECTED:
      return { color: '#f00' }
    case StoreStatus.DISABLED:
      return { color: '#B91C1C' }
    default:
      return { color: '#000' }
  }
}
