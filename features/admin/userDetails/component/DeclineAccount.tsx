import React from 'react'
import Button from '@/components/common/button'
import { useDeclineAccount } from '@/hooks/useMutation/admin/useDeclineAccount'
import { useRouter } from 'expo-router'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import Typo from '@/components/common/typo'
import { AntDesign } from '@expo/vector-icons'
import { Text } from 'react-native'

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
          console.log('User declined successfully')
          router.push('/screens/(admin)/dashboard/members')
        },
        onError: (error) => {
          console.error('Error declining user:', error)
        },
      },
    )
  }

  if (isPending) return <LoadingIndicator />

  return (
    <Button
      onPress={handleDecline}
      className="flex-1 w-44 bg-gradient-to-r from-red-500 to-red-600 flex-row items-center justify-center gap-2 rounded-xl py-3.5 shadow-lg shadow-red-500/20"
      icon={
        <AntDesign name="closecircle" size={22} color="white" />
      }
    >
      <Text className="text-white font-semibold text-base">Decline</Text>
    </Button>
  )
}

export default DeclineAccount
