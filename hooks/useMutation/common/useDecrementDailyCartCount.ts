import { decrementDailyCartCount } from '@/api/common/decrementDailyCartCount'
import { useMutation } from '@tanstack/react-query'

export const useDecrementDailyCartCount = () => {
  return useMutation({
    mutationFn: decrementDailyCartCount,
  })
}
