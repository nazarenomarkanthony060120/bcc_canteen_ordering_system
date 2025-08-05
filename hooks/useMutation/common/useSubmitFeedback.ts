import { useMutation } from '@tanstack/react-query'
import { submitFeedback } from '@/api/common/submitFeedback'
import { SubmitFeedbackRequest } from '@/utils/types'

export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: (params: SubmitFeedbackRequest) => submitFeedback(params),
  })
}
