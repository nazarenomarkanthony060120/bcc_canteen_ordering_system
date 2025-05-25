import { UserType } from '@/utils/types'

type GetUserRoutesType = {
  type: UserType | undefined
}

export const getUserProfileRoutes = ({ type }: GetUserRoutesType) => {
  switch (type) {
    case UserType.SELLER:
      return '/screens/(seller)/dashboard/profile'
    case UserType.STUDENT:
      return '/screens/(student)/dashboard/profile'
    case UserType.TEACHER:
      return '/screens/(teacher)/dashboard/profile'
    case UserType.OUTSIDER:
      return '/screens/(student)/dashboard/profile'
    case UserType.ADMIN:
      return '/screens/(admin)/dashboard/profile'
    case UserType.OUTSIDER:
      return '/screens/(other)/dashboard/profile'
    default:
      return '/not-found'
  }
}
