import { fetchAllMembers } from '@/api/admin/fetchAllMembers'
import { fetchAllUsers } from '@/api/admin/fetchAllUsers'
import { User, UserIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchAllUsers = ({ id }: UserIdRequest) => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetchAllUsers({ id }),
  })
}
