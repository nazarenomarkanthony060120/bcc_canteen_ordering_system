import { ReservedItem } from '@/utils/types'

type GetTotalAmountType = {
  reservedItems: ReservedItem[]
}

export const getTotalAmount = ({ reservedItems }: GetTotalAmountType) => {
  return reservedItems.reduce((total, item) => total + item.totalPrice, 0)
}
