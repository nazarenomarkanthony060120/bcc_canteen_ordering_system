import { fetchAllPopularFoods } from '@/api/common/fetchAllPopularFoods'
import { Food } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchAllPopularFoods = () => {
  return useQuery<Food[]>({
    queryKey: ['popularFoods'],
    queryFn: () => fetchAllPopularFoods(),
  })
}
