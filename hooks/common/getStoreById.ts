import { getStoreById } from '@/api/common/getStoreById'
import { StoreIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useGetStoreById = ({ id }: StoreIdRequest) => {
  return useQuery({
    queryKey: ['stores', id],
    queryFn: () => getStoreById({ id }),
    enabled: !!id,
  })
}
