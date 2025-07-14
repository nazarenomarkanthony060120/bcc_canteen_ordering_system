import { UserType } from '@/utils/types'

type GetUserRoutesType = {
  type: UserType | undefined
}

export const getUserProfileRoutes = ({ type }: GetUserRoutesType) => {
  console.log('getUserProfileRoutes', type)
  switch (type) {
    case UserType.SELLER:
      return '/screens/(seller)/dashboard/profile'
    case UserType.ADMIN:
      return '/screens/(admin)/dashboard/profile'
    case UserType.CUSTORMER:
      return '/screens/(customer)/dashboard/profile'
    default:
      return '/not-found'
  }
}
