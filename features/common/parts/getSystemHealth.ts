import { SystemHealth } from '@/utils/collections'

export const getSystemHealth = (status: String): Boolean => {
  console.log(`status ni ${status}`)
  return status !== SystemHealth.DEAD
}
