import { ReservationStatus, ReservationStatusText } from '@/utils/types'

export const getReservationStatus = (status: number) => {
  switch (status) {
    case ReservationStatus.RESERVED:
      return ReservationStatusText.RESERVED
    case ReservationStatus.PENDING:
      return ReservationStatusText.PENDING
    case ReservationStatus.CANCELLED:
      return ReservationStatusText.CANCELLED
    case ReservationStatus.COMPLETED:
      return ReservationStatusText.COMPLETED
    case ReservationStatus.CONFIRMED:
      return ReservationStatusText.CONFIRMED
    default:
      return ReservationStatusText.UNKNOWN
  }
}
