import React from 'react'
import Button from '@/components/common/button'
import { useApproveAccount } from '@/hooks/useMutation/admin/useApproveAccount'
import { useRouter } from 'expo-router'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import Typo from '@/components/common/typo'
import { AntDesign } from '@expo/vector-icons'

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
      className="w-44 flex-row items-center justify-center gap-2 rounded-lg bg-emerald-700"
      icon={
        <AntDesign className="py-3" name="adduser" size={20} color="white" />
      }
    >
      <Typo className="text-white">Approve</Typo>
    </Button>
  )
}

export default ApproveAccount
