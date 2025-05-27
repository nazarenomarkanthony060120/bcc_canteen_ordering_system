import { useMutation } from '@tanstack/react-query'
import { saveReservedOrder } from '@/api/common/saveReservedOrder'
import { SaveReservedOrderType } from '@/utils/types'

export const useSaveReservedOrder = () => {
  return useMutation({
    mutationFn: (params: SaveReservedOrderType) => saveReservedOrder(params),
  })
}
