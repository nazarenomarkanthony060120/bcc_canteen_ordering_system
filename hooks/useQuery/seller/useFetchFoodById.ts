import { getFoodByFoodId } from '@/api/common/getFoodByFoodId'
import { FoodIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchFoodById = (foodId: string | null) => {
  return useQuery({
    queryKey: ['food', foodId],
    queryFn: () => getFoodByFoodId({ id: foodId }),
    enabled: !!foodId,
  })
}

