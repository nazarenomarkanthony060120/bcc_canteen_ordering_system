import { fetchNewlyAddedFoods } from '@/api/common/fetchNewlyAddedFoods'
import { Food } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchNewlyAddedFoods = () => {
  return useQuery<Food[]>({
    queryKey: ['popularFoods'],
    queryFn: () => fetchNewlyAddedFoods(),
  })
}
