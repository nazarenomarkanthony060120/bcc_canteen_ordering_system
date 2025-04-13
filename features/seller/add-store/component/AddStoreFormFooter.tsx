import React from 'react'
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/common/button'
import Typo from '@/components/common/typo'

interface AddStoreFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  onSubmit: SubmitHandler<FieldValues>
  isPending: boolean
}

const AddStoreFormFooter = ({
  handleSubmit,
  onSubmit,
  isPending,
}: AddStoreFormFooterProps) => {
  return (
    <SafeAreaView className="gap-3">
      <Button
        className="bg-cyan-400 items-center rounded-3xl p-5"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        <Typo className="text-white">Create Store</Typo>
      </Button>
    </SafeAreaView>
  )
}

export default AddStoreFormFooter
