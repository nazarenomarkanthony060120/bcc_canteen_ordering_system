import { fetchAllStoresByStatus } from '@/api/common/fetchAllStoresByStatus'
import { Store } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchAllStoresByStatus = () => {
  return useQuery<Store[]>({
    queryKey: ['fetchAllStoresByStatus'],
    queryFn: () => fetchAllStoresByStatus(),
  })
}
