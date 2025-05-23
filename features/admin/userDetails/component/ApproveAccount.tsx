import React from 'react'
import Button from '@/components/common/button'
import { useApproveAccount } from '@/hooks/useMutation/admin/useApproveAccount'
import { useRouter } from 'expo-router'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import Typo from '@/components/common/typo'
import { AntDesign } from '@expo/vector-icons'
import { Text } from 'react-native'

interface ApproveAccountProps {
  userId: string
}

const ApproveAccount = ({ userId }: ApproveAccountProps) => {
  const { mutate: approveUser, isPending } = useApproveAccount()
  const router = useRouter()

  const handleApprove = () => {
    approveUser(
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
      onPress={handleApprove}
      className="flex-1 w-44 bg-gradient-to-r from-emerald-500 to-emerald-600 flex-row items-center justify-center gap-2 rounded-xl py-3.5 shadow-lg shadow-emerald-500/20"
      icon={<AntDesign name="checkcircle" size={22} color="white" />}
    >
      <Text className="text-white font-semibold text-base">Approve</Text>
    </Button>
  )
}

export default ApproveAccount
