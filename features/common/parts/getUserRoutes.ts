import { UserType } from '@/utils/types'

type GetUserRoutesType = {
  type: UserType | undefined
}

export const getUserRoutes = ({ type }: GetUserRoutesType) => {
  switch (type) {
    case UserType.SELLER:
      return '/screens/(seller)/dashboard/dashboard'
    case UserType.ADMIN:
      return '/screens/(admin)/dashboard/dashboard'
    case UserType.CUSTORMER:
      return '/screens/(customer)/dashboard/dashboard'
    default:
      return '/not-found'
  }
}
