import { fetchAllStores } from '@/api/common/fetchAllStores'
import { Store } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchAllStores = () => {
  return useQuery<Store[]>({
    queryKey: ['stores'],
    queryFn: () => fetchAllStores(),
  })
}
