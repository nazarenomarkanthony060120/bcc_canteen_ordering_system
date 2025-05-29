import { FoodReservationStatus, FoodReservationStatusText } from '@/utils/types'

export const getFoodReservationStatus = (status: number) => {
  switch (status) {
    case FoodReservationStatus.PENDING:
      return FoodReservationStatusText.PENDING
    case FoodReservationStatus.COMPLETED:
      return FoodReservationStatusText.COMPLETED
    case FoodReservationStatus.CANCELLED:
      return FoodReservationStatusText.CANCELLED
    default:
      return FoodReservationStatusText.UNKNOWN
  }
}
