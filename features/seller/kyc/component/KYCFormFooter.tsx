import { View, Text } from 'react-native'
import React from 'react'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'

interface KYCFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const KYCFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: KYCFormFooterProps) => {
  return (
    <SafeAreaView className="gap-3">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <Typo className="text-white">Complete KYC</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default KYCFormFooter
