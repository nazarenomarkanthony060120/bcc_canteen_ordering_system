import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import KYCFormHeader from './KYCFormHeader'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { UserKYC } from '@/utils/types'
import KYCFormContents from './KYCFormContents'
import { ScrollView } from 'react-native'
import KYCFormFooter from './KYCFormFooter'
import { useRouter } from 'expo-router'
import { userRegister } from '@/hooks/register'
import { useUserKYCRegister } from '@/hooks/common/useUserKYCRegister'
import Error from '@/components/parts/Error'

const KYCFormCard = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()
  const { mutate: userKycRegister, error, isPending } = useUserKYCRegister()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    userKycRegister(data as UserKYC, {
      onSuccess: () => {
        router.replace('/screens/(seller)/dashboard/cart')
      },
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-2 p-5">
        <KYCFormHeader />
        <KYCFormContents control={control} getValues={getValues} />
        <KYCFormFooter
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </SafeAreaView>
      {Object.keys(errors).length > 0 && <Error errors={errors} />}
    </ScrollView>
  )
}

export default KYCFormCard
