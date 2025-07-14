import { UserType } from '@/utils/types'

type GetUserCartRoutesType = {
  type: UserType | undefined
}

export const getUserCartRoutes = ({ type }: GetUserCartRoutesType) => {
  switch (type) {
    case UserType.SELLER:
      return '/screens/(seller)/dashboard/cart'
    case UserType.ADMIN:
      return '/screens/(admin)/dashboard/cart'
    case UserType.CUSTORMER:
      return '/screens/(customer)/dashboard/cart'
    default:
      return '/not-found'
  }
}
