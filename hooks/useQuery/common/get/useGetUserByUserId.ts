import { fetchUserById } from '@/api/common/fetchUserById'
import { UserIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useGetUserByUserId = ({ id }: UserIdRequest) => {
  return useQuery({
    queryKey: ['fetchUserById', id],
    queryFn: async () => {
      if (!id) return null
      const result = await fetchUserById({ id })
      return result || null
    },
    enabled: !!id,
  })
}
