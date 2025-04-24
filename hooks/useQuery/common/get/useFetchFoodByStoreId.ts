import { fetchFoodByStoreId } from '@/api/common/fetchFoodByStoreId'
import { Food, StoreIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchFoodByStoreId = ({ id }: StoreIdRequest) => {
  return useQuery<Food[]>({
    queryKey: ['fetchFoodByStoreId', id],
    queryFn: () => fetchFoodByStoreId({ id }),
  })
}
