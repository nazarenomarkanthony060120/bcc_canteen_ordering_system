import { UserType } from '@/utils/types'

type GetUserRoutesType = {
  type: UserType | undefined
}

export const getUserRoutes = ({ type }: GetUserRoutesType) => {
  switch (type) {
    case UserType.SELLER:
      return '/screens/(seller)/dashboard/dashboard'
    case UserType.STUDENT:
      return '/screens/(student)/dashboard/dashboard'
    case UserType.TEACHER:
      return '/screens/(teacher)/dashboard/dashboard'
    case UserType.OUTSIDER:
      return '/screens/(student)/dashboard/dashboard'
    case UserType.ADMIN:
      return '/screens/(admin)/dashboard/dashboard'
    default:
      return '/not-found'
  }
}
