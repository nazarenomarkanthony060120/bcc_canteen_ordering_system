import { fetchUserById } from '@/api/common/fetchUserById'
import { UserIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useGetUserByUserId = ({ id }: UserIdRequest) => {
  return useQuery({
    queryKey: ['fetchUserById', id],
    queryFn: () => fetchUserById({ id }),
  })
}
