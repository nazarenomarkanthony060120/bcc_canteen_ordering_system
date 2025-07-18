import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'

interface CreateSellerAccountFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const CreateSellerAccountFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: CreateSellerAccountFormFooterProps) => {
  return (
    <SafeAreaView className="gap-3 mt-6">
      <Button
        className="bg-emerald-500 items-center rounded-3xl p-5"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <Typo className="text-white font-semibold">Create Seller Account</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default CreateSellerAccountFormFooter
