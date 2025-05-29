import { getHistories } from '@/api/seller/getHistories'
import { GetHistoriesRequest } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

export const useGetHistories = ({ storeId }: GetHistoriesRequest) => {
  return useQuery({
    queryKey: ['getHistories', storeId],
    queryFn: () => getHistories({ storeId }),
  })
}
