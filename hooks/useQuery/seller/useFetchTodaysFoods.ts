import { fetchTodaysFoods } from '@/api/seller/fetchTodaysFoods'
import { Food, StoreIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchTodaysFoods = ({ id }: StoreIdRequest) => {
  return useQuery<Food[]>({
    queryKey: ['fetchTodaysFoods', id],
    queryFn: () => fetchTodaysFoods({ id }),
    enabled: !!id,
  })
}
