import { UserKYCStatus } from '@/utils/types'

export const getUserStatusColor = (status: number) => {
  switch (status) {
    case UserKYCStatus.APPLIED:
      return { color: '#ffee00' }
    case UserKYCStatus.PENDING:
      return { color: '#e407e8' }
    case UserKYCStatus.APPROVED:
      return { color: '#17bf41' }
    case UserKYCStatus.REJECTED:
      return { color: '#f00' }
    case UserKYCStatus.DISABLED:
      return { color: '#ad219d' }
    default:
      return { color: '#000' }
  }
}
