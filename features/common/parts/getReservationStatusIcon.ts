import { ReservationStatus } from '@/utils/types'

export const getReservationStatusIcon = (status: number) => {
  switch (status) {
    case ReservationStatus.RESERVED:
      return 'hourglass-top'
    case ReservationStatus.COMPLETED:
      return 'check-circle'
    case ReservationStatus.CANCELLED:
      return 'cancel'
    default:
      return 'help'
  }
}
