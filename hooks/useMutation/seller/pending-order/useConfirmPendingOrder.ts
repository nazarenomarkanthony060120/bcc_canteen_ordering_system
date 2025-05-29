import { confirmPendingOrder } from '@/api/seller/confirm-pending-order/confirmPendingOrder'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReservationIdRequest } from '@/utils/types'

export const useConfirmPendingOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ReservationIdRequest) => confirmPendingOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations-pending'] })
    },
  })
}
