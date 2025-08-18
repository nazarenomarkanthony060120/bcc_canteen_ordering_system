import { incrementDailyCartCount } from '@/api/common/incrementDailyCartCount'
import { useMutation } from '@tanstack/react-query'

export const useIncrementDailyCartCount = () => {
  return useMutation({
    mutationFn: incrementDailyCartCount,
  })
}
