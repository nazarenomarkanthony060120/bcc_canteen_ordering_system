import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileImage } from '@/api/common/updateProfileImage'

interface UpdateProfileImageProps {
  userId: string
  imageBase64: string
}

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, imageBase64 }: UpdateProfileImageProps) =>
      updateProfileImage(userId, imageBase64),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
    },
  })
} 