import React from 'react'
import Button from '@/components/common/button'
import { AntDesign } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useDeclineAccount } from '@/hooks/useMutation/admin/useDeclineAccount'
import { useRouter } from 'expo-router'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

interface DeclineAccountProps {
  userId: string
}

const DeclineAccount = ({ userId }: DeclineAccountProps) => {
  const { mutate: declineUser, isPending } = useDeclineAccount()
  const router = useRouter()

  const handleDecline = () => {
    declineUser(
      { id: userId },
      {
        onSuccess: () => {
          console.log('User approved successfully')
          router.push('/screens/(admin)/dashboard/members')
        },
        onError: (error) => {
          console.error('Error approving user:', error)
        },
      },
    )
  }

  if (isPending) return <LoadingIndicator />
  return (
    <Button
      onPress={handleDecline}
      className="w-44 flex-row items-center justify-center gap-2 rounded-lg bg-red-700"
      icon={<AntDesign className="py-3" name="minus" size={20} color="white" />}
    >
      <Typo className="text-white">Decline</Typo>
    </Button>
  )
}

export default DeclineAccount
