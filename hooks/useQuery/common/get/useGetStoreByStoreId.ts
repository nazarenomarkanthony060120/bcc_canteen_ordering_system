import { getStoreByStoreId } from '@/api/common/getStoreByStoreId'
import { StoreIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useGetStoreByStoreId = ({ id }: StoreIdRequest) => {
  return useQuery({
    queryKey: ['getStoreByStoreId', id],
    queryFn: () => getStoreByStoreId({ id }),
  })
}
