import { getStoreById } from '@/api/common/getStoreById'
import { StoreIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useGetStoreById = ({ storeId }: StoreIdRequest) => {
  return useQuery({
    queryKey: ['store', storeId],
    queryFn: () => getStoreById({ storeId }),
    enabled: !!storeId,
    refetchInterval: 2000,
  })
}
