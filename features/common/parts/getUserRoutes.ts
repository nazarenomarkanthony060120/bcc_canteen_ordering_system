import { UserType } from '@/utils/types'

type getUserRoutes = {
  type: UserType
}

export const getUserRoutes = (type: UserType) => {
  switch (type) {
    case UserType.SELLER:
      return '/screens/(seller)/dashboard/dashboard'
    case UserType.STUDENT:
      return '/screens/(student)/dashboard/dashboard'
    case UserType.TEACHER:
      return '/screens/(teacher)/dashboard/dashboard'
    case UserType.OUTSIDER:
      return '/screens/(student)/dashboard/dashboard'
    default:
      return '/screens/(admin)/dashboard/dashboard'
  }
}
