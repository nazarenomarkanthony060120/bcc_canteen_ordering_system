import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'

interface RegisterFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const RegisterFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: RegisterFormFooterProps) => {
  return (
    <SafeAreaView className="gap-3">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <Typo className="text-white">Register</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default RegisterFormFooter
