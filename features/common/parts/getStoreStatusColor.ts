import { StoreStatus, StoreStatusText } from '@/utils/types'

type GetStoreStatusColorTypes = {
  text: string
  color: string
  bgColor: string
  icon: any
  gradient: string[]
  textColor: string
  borderColor: string
}

export const getStoreStatusColor = (
  status: number,
): GetStoreStatusColorTypes => {
  switch (status) {
    case StoreStatus.APPLIED:
      return {
        text: StoreStatusText.APPLIED,
        color: '#3B82F6',
        bgColor: '#EFF6FF',
        icon: 'hourglass-empty' as const,
        gradient: [
          'rgba(59, 130, 246, 0.1)',
          'rgba(96, 165, 250, 0.1)',
        ] as const,
        textColor: '#3B82F6',
        borderColor: 'rgba(59, 130, 246, 0.3)',
      }
    case StoreStatus.PENDING:
      return {
        text: StoreStatusText.PENDING,
        color: '#F59E0B',
        bgColor: '#FFFBEB',
        icon: 'schedule' as const,
        gradient: [
          'rgba(245, 158, 11, 0.1)',
          'rgba(251, 191, 36, 0.1)',
        ] as const,
        textColor: '#F59E0B',
        borderColor: 'rgba(245, 158, 11, 0.3)',
      }
    case StoreStatus.APPROVED:
      return {
        text: StoreStatusText.APPROVED,
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
    case StoreStatus.REJECTED:
      return {
        text: StoreStatusText.REJECTED,
        color: '#EF4444',
        bgColor: '#FEF2F2',
        icon: 'cancel' as const,
        gradient: [
          'rgba(239, 68, 68, 0.1)',
          'rgba(248, 113, 113, 0.1)',
        ] as const,
        textColor: '#EF4444',
        borderColor: 'rgba(239, 68, 68, 0.3)',
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
