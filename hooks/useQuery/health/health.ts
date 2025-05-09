import { fetchSystemHealth } from '@/api/health/health'
import { useQuery } from '@tanstack/react-query'

export const useGetSystemHealth = () => {
  return useQuery({
    queryKey: ['fetchSystemHealth'],
    queryFn: () => fetchSystemHealth(),
    refetchInterval: 1000,
  })
}
