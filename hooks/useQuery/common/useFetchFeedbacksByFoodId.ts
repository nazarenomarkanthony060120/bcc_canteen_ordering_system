import { useQuery } from '@tanstack/react-query'
import { fetchFeedbacksByFoodId } from '@/api/common/fetchFeedbacksByFoodId'

interface UseFetchFeedbacksByFoodIdProps {
  foodId: string
  enabled?: boolean
}

export const useFetchFeedbacksByFoodId = ({
  foodId,
  enabled = true,
}: UseFetchFeedbacksByFoodIdProps) => {
  return useQuery({
    queryKey: ['fetchFeedbacksByFoodId', foodId],
    queryFn: () => fetchFeedbacksByFoodId(foodId),
    enabled: enabled && !!foodId,
  })
}
