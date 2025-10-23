import { ReservedItem } from '@/utils/types'
import { ReservationStatus } from '@/utils/types'

type GetReservationStatusResultType = {
  item: ReservedItem[]
  userId: string | undefined
}

export const getReservationStatusResult = ({
  item,
  userId,
}: GetReservationStatusResultType): number => {
  const storeOwnerItems = item.filter((item) => item.storeOwnerId === userId)
  if (storeOwnerItems.length === 0) return ReservationStatus.PENDING

  const hasCancelledItems = storeOwnerItems.some(
    (item) => item.status === ReservationStatus.CANCELLED,
  )
  if (hasCancelledItems) return ReservationStatus.CANCELLED

  const hasReadyForPickupItems = storeOwnerItems.some(
    (item) => item.status === ReservationStatus.READY_FOR_PICKUP,
  )
  if (hasReadyForPickupItems) return ReservationStatus.READY_FOR_PICKUP

  const hasConfirmedItems = storeOwnerItems.some(
    (item) => item.status === ReservationStatus.CONFIRMED,
  )
  if (hasConfirmedItems) return ReservationStatus.CONFIRMED

  const hasCompletedItems = storeOwnerItems.some(
    (item) => item.status === ReservationStatus.COMPLETED,
  )
  if (hasCompletedItems) return ReservationStatus.COMPLETED

  return ReservationStatus.PENDING
}
