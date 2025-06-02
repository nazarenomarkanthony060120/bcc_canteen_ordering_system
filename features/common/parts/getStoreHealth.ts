import { StoreHealth, StoreHealthText, StoreStatusText } from '@/utils/types'

type GetStoreStatusColorTypes = {
  text: string
  color: string
  bgColor: string
  icon: any
  gradient: string[]
  textColor: string
  borderColor: string
}

export const getStoreHealthColor = (
  status: number,
): GetStoreStatusColorTypes => {
  switch (status) {
    case StoreHealth.ACTIVE:
      return {
        text: StoreHealthText.ACTIVE,
        color: '#10B981',
        bgColor: '#ECFDF5',
        icon: 'check-circle' as const,
        gradient: [
          'rgba(16, 185, 129, 0.1)',
          'rgba(52, 211, 153, 0.1)',
        ] as const,
        textColor: '#10B981',
        borderColor: 'rgba(16, 185, 129, 0.3)',
      }
    case StoreHealth.DISABLED:
      return {
        text: StoreHealthText.DISABLED,
        color: '#F87171',
        bgColor: '#FEF2F2',
        icon: 'block' as const,
        gradient: [
          'rgba(248, 113, 113, 0.1)',
          'rgba(239, 68, 68, 0.1)',
        ] as const,
        textColor: '#F87171',
        borderColor: 'rgba(248, 113, 113, 0.3)',
      }
    default:
      return {
        text: StoreStatusText.UNKWON,
        color: '#6B7280',
        bgColor: '#F3F4F6',
        icon: 'help' as const,
        gradient: [
          'rgba(107, 114, 128, 0.1)',
          'rgba(156, 163, 175, 0.1)',
        ] as const,
        textColor: '#6B7280',
        borderColor: 'rgba(107, 114, 128, 0.3)',
      }
  }
}
