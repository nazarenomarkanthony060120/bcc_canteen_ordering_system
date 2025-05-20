import { UserKYCStatus, UserKYCStatusText } from '@/utils/types'

export const getUserStatus = (status: number) => {
  switch (status) {
    case UserKYCStatus.APPLIED:
      return UserKYCStatusText.APPLIED
    case UserKYCStatus.PENDING:
      return UserKYCStatusText.PENDING
    case UserKYCStatus.APPROVED:
      return UserKYCStatusText.APPROVED
    case UserKYCStatus.REJECTED:
      return UserKYCStatusText.REJECTED
    case UserKYCStatus.DISABLED:
      return UserKYCStatusText.DISABLED
    default:
      return UserKYCStatusText.UNKWON
  }
}
