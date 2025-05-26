import React from 'react'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { View } from 'lucide-react-native'
import { SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router'

interface LoginFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const LoginFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: LoginFormFooterProps) => {
  const router = useRouter()
  const navigateToForgotPassword = () => {
    router.push('/(auth)/forgot-password')
  }

  return (
    <SafeAreaView className="gap-3">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <Typo className="text-white">Sign In</Typo>
      </Button>
      <SafeAreaView className="items-end ">
        <Button
          onPress={navigateToForgotPassword}
          className="items-end bg-emerald-500 p-1 px-4 rounded-3xl"
        >
          <Typo className="text-white text-right">Forgot Password</Typo>
        </Button>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default LoginFormFooter
