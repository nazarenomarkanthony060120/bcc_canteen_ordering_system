import { ReservationStatus, ReservedItem } from '@/utils/types'

type GetReservationStatusResultType = {
  item: ReservedItem[]
  userId: string | undefined
}
export const getReservationStatusResult = ({
  item,
  userId,
}: GetReservationStatusResultType) => {
  return item.some(
    (item) =>
      item.storeOwnerId === userId && item.status !== ReservationStatus.PENDING,
  )
    ? ReservationStatus.COMPLETED
    : ReservationStatus.PENDING
}
