import { UserType } from '@/utils/types'

type GetUserCartRoutesType = {
  type: UserType | undefined
}

export const getUserCartRoutes = ({ type }: GetUserCartRoutesType) => {
  switch (type) {
    case UserType.SELLER:
      return '/screens/(seller)/dashboard/cart'
    case UserType.STUDENT:
      return '/screens/(student)/dashboard/cart'
    case UserType.TEACHER:
      return '/screens/(teacher)/dashboard/cart'
    case UserType.OUTSIDER:
      return '/screens/(student)/dashboard/cart'
    case UserType.ADMIN:
      return '/screens/(admin)/dashboard/cart'
    default:
      return '/not-found'
  }
}
