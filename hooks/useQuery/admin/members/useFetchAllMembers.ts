import { fetchAllMembers } from '@/api/admin/fetchAllMembers'
import { User, UserIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchAllMembers = ({ id }: UserIdRequest) => {
  return useQuery<User[]>({
    queryKey: ['members'],
    queryFn: () => fetchAllMembers({ id }),
  })
}
