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

  const hasCompletedItems = storeOwnerItems.some(
    (item) => item.status !== ReservationStatus.PENDING,
  )
  return hasCompletedItems
    ? ReservationStatus.COMPLETED
    : ReservationStatus.PENDING
}
