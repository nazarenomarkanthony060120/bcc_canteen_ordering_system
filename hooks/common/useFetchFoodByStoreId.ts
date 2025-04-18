import { fetchFoodByStoreId } from '@/api/common/fetchFoodByStoreId'
import { Food, StoreIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchFoodById = ({ id }: StoreIdRequest) => {
  return useQuery<Food[]>({
    queryKey: ['food', id],
    queryFn: () => fetchFoodByStoreId({ id }),
    enabled: !!id,
  })
}
