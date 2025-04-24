import { getFoodByFoodId } from '@/api/common/getFoodByFoodId'
import { StoreIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useGetFoodByFoodId = ({ id }: StoreIdRequest) => {
  return useQuery({
    queryKey: ['getFoodByFoodId', id],
    queryFn: () => getFoodByFoodId({ id }),
  })
}
