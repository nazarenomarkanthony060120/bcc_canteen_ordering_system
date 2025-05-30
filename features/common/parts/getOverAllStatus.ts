import {
  FoodReservationStatus,
  ReservationStatus,
  ReservedItem,
} from '@/utils/types'

export const getOverallStatus = (items: ReservedItem[]) => {
  if (items.length === 0) return ReservationStatus.PENDING

  const allCompleted = items.every(
    (item) => item.status === FoodReservationStatus.COMPLETED,
  )
  if (allCompleted) return ReservationStatus.COMPLETED

  const anyCancelled = items.some(
    (item) => item.status === FoodReservationStatus.CANCELLED,
  )
  if (anyCancelled) return ReservationStatus.CANCELLED

  return ReservationStatus.PENDING
}
