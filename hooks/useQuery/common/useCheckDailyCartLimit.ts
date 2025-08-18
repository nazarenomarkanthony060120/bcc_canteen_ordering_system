import { checkDailyCartLimit, DailyCartLimitResponse } from '@/api/common/checkDailyCartLimit'
import { UserIdRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useCheckDailyCartLimit = ({ id }: UserIdRequest) => {
  return useQuery<DailyCartLimitResponse>({
    queryKey: ['checkDailyCartLimit', id],
    queryFn: () => checkDailyCartLimit({ id }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  })
}
