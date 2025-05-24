import { fetchCartByUserId } from '@/api/common/fetchCartByUserId'
import { Cart } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import { UserIdRequest } from '@/utils/types'

export const useFetchCartByUserId = ({ id }: UserIdRequest) => {
  return useQuery<Cart[]>({
    queryKey: ['fetchCartByUserId', id],
    queryFn: () => fetchCartByUserId({ id }),
    enabled: !!id,
  })
}
