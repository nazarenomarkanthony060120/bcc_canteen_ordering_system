import { db } from '@/lib/firestore'
import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

interface UseFoodPopularityProps {
  foodId: string
}

export const useFoodPopularity = ({ foodId }: UseFoodPopularityProps) => {
  return useQuery({
    queryKey: ['foodPopularity', foodId],
    queryFn: async () => {
      if (!foodId) return 0
      const docRef = doc(db, 'foods', foodId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data().popularity || 0 : 0
    },
    enabled: !!foodId,
  })
}
