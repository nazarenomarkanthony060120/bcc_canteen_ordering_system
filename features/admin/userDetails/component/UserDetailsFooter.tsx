import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import Button from '@/components/common/button'
import { AntDesign } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { useApproveUser } from '@/hooks/useMutation/admin/useApproveUser'
import { useRouter } from 'expo-router'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'
import { UserKYCStatus } from '@/utils/types'

interface UserDetailsFooterProps {
  userId: string
}

const UserDetailsFooter = ({ userId }: UserDetailsFooterProps) => {
  const { data: user } = useGetUserByUserId({ id: userId })
  const { mutate: approveUser, isPending } = useApproveUser()
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

  if (isPending) return <ActivityIndicator size="large" color="#0000ff" />

  if (user?.status === UserKYCStatus.PENDING)
    return (
      <View className="flex-row justify-between items-center p-5">
        <Button
          onPress={handleApprove}
          className="w-44 flex-row items-center justify-center gap-2 rounded-lg bg-emerald-700"
          icon={
            <AntDesign
              className="py-3"
              name="adduser"
              size={20}
              color="white"
            />
          }
        >
          <Typo className="text-white">Approve</Typo>
        </Button>
        <Button
          className="w-44 flex-row items-center justify-center gap-2 rounded-lg bg-red-700"
          icon={
            <AntDesign className="py-3" name="minus" size={20} color="white" />
          }
        >
          <Typo className="text-white">Decline</Typo>
        </Button>
      </View>
    )
}

export default UserDetailsFooter
