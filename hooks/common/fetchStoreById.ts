import { fetchStoreById } from '@/api/common/fetchStoreById'
import { UserIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import { Store } from '@/utils/types'

export const useFetchStoreById = ({ id }: UserIdRequest) => {
  return useQuery<Store[]>({
    queryKey: ['store', id],
    queryFn: () => fetchStoreById({ id }),
    enabled: !!id,
    refetchInterval: 2000,
  })
}
