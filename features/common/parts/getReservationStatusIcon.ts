import { ReservationStatus } from '@/utils/types'

export const getReservationStatusIcon = (status: number) => {
  switch (status) {
    case ReservationStatus.PENDING:
      return 'schedule'
    case ReservationStatus.COMPLETED:
      return 'check-circle'
    case ReservationStatus.CANCELLED:
      return 'cancel'
    case ReservationStatus.CONFIRMED:
      return 'verified'
    case ReservationStatus.READY_FOR_PICKUP:
      return 'shopping-bag'
    default:
      return 'help'
  }
}
