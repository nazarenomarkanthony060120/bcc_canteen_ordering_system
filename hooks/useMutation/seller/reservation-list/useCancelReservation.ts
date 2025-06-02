import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CancelReservationIdRequest } from '@/utils/types'
import { cancelReservation } from '@/api/seller/reservation-list/cancelReservation'

export const useCancelReservation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CancelReservationIdRequest) => cancelReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations-pending'] })
    },
  })
}
