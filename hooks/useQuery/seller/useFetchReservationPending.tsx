import { fetchReservationPending } from '@/api/seller/reservation-pending/fetchReservationPending'
import { useAuth } from '@/context/auth'
import { ReservationOrders } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchReservationPending = () => {
  const auth = useAuth()

  const {
    data: reservations = [],
    isLoading,
    error,
    refetch: onRefresh,
    isRefetching: refreshing,
  } = useQuery<ReservationOrders[]>({
    queryKey: ['reservations-pending', auth.user?.uid],
    queryFn: () => fetchReservationPending(auth.user?.uid),
    enabled: !!auth.user?.uid,
  })

  return {
    reservations,
    isLoading,
    refreshing,
    onRefresh,
    error,
  }
}
