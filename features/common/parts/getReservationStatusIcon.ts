import { ReservationStatus } from '@/utils/types'

export const getReservationStatusIcon = (status: number) => {
  switch (status) {
    case ReservationStatus.PENDING:
      return 'hourglass-top'
    case ReservationStatus.COMPLETED:
      return 'check-circle'
    case ReservationStatus.CANCELLED:
      return 'cancel'
    case ReservationStatus.CONFIRMED:
      return 'incomplete-circle'
    default:
      return 'help'
  }
}
