import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReservationIdRequest } from '@/utils/types'
import { cancelPendingOrder } from '@/api/seller/cancel-pending-order/cancelPendingOrder'

export const useCancelPendingOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ReservationIdRequest) => cancelPendingOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations-pending'] })
    },
  })
}
