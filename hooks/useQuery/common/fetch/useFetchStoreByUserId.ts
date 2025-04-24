import { fetchStoreById } from '@/api/common/fetchStoreById'
import { UserIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import { Store } from '@/utils/types'

export const useFetchStoreByUserId = ({ id }: UserIdRequest) => {
  return useQuery<Store[]>({
    queryKey: ['fetchStoreById', id],
    queryFn: () => fetchStoreById({ id }),
  })
}
