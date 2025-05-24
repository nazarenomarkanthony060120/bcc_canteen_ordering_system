import { db } from '@/lib/firestore'
import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

interface UseIsFoodFavoritedParams {
  userId: string
  foodId: string
}

export const useIsFoodFavorited = ({
  userId,
  foodId,
}: UseIsFoodFavoritedParams) => {
  return useQuery({
    queryKey: ['favorites', userId, foodId],
    queryFn: async () => {
      if (!userId || !foodId) return false

      const favoriteRef = doc(db, 'favorites', `${userId}_${foodId}`)
      const favoriteDoc = await getDoc(favoriteRef)
      return favoriteDoc.exists()
    },
    enabled: !!userId && !!foodId,
  })
}
