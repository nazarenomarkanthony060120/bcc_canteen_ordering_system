import { useAuth } from '@/context/auth'
import { fetchReservations } from '@/api/reservations/fetchReservations'
import { Reservation } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchReservations = () => {
  const auth = useAuth()

  const {
    data: reservations = [],
    isLoading,
    error,
    refetch: onRefresh,
    isRefetching: refreshing,
  } = useQuery<Reservation[]>({
    queryKey: ['reservations', auth.user?.uid],
    queryFn: () => fetchReservations(auth.user?.uid),
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
