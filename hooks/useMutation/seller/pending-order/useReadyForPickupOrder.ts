import { readyForPickupOrder } from '@/api/seller/ready-for-pickup-order/readyForPickupOrder'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useReadyForPickupOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: readyForPickupOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations-pending'] })
    },
  })
}


