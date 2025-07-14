import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReservationIdRequest } from '@/utils/types'
import { completePendingOrder } from '@/api/seller/complete-pending-order/completePendingOrder'

export const useCompletePendingOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ReservationIdRequest) => completePendingOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations-pending'] })
    },
  })
}
