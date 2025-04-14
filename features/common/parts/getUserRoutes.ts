import { UserType } from '@/utils/types'

type getUserRoutes = {
  type: UserType
}

export const getUserRoutes = (type: UserType) => {
  switch (type) {
    case UserType.SELLER:
      return '/screens/(seller)/dashboard/dashboard'

    default:
      return '/screens/(admin)/dashboard/dashboard'
  }
}
