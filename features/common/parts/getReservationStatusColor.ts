import { ReservationStatus } from '@/utils/types'

export const getReservationStatusColor = (status: number) => {
  switch (status) {
    case ReservationStatus.PENDING:
      return '#10B981'
    case ReservationStatus.COMPLETED:
      return '#3B82F6'
    case ReservationStatus.CANCELLED:
      return '#EF4444'
    default:
      return '#6B7280'
  }
}
