import { useMutation } from '@tanstack/react-query'
import { saveReservedOrder } from '@/api/common/saveReservedOrder'
import { Cart } from '@/utils/types'

interface SaveReservedOrderParams {
  userId: string
  cartItems: Cart[]
  totalAmount: number
  paymentMethod: 'Cash' | 'GCash'
}

export const useSaveReservedOrder = () => {
  return useMutation({
    mutationFn: (params: SaveReservedOrderParams) => saveReservedOrder(params),
  })
}
