import React, { useState } from 'react'
import { View } from 'react-native'
import { useAuth } from '@/context/auth'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { CreateStore } from '@/utils/types'
import CountDown from '@/components/parts/CountDown'
import Error from '@/components/parts/Error'
import AddStoreFormFooter from './AddStoreFormFooter'
import AddStoreFormContents from './AddStoreFormContents'
import { useCreateStore } from '@/hooks/useMutation/seller/store/useCreateStore'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { LinearGradient } from 'expo-linear-gradient'

const AddStoreFormCard = () => {
  const [showCountdown, setShowCountdown] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const auth = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { mutate: userCreateStore, isPending } = useCreateStore()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsCreate(true)
    const formData = {
      image: data.image,
      userId: auth.user?.uid,
      store: data.store,
      address: data.address,
    }
    userCreateStore(formData as CreateStore, {
      onSuccess: () => {
        setShowCountdown(true)
      },
      onError: (error) => {
        console.error('Store creation failed:', error)
        setIsCreate(false)
      },
    })
  }

  return (
    <>
      <View className="mb-8">
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-3xl overflow-hidden"
        >
          <LinearGradient
            colors={['#10B981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6 rounded-3xl"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-white/20 p-3 rounded-xl">
                <MaterialIcons name="store" size={28} color="white" />
              </View>
              <View>
                <Typo className="text-white/90 text-base font-medium mb-1">
                  Welcome to
                </Typo>
                <Typo className="text-white text-2xl font-bold">
                  Create Your Store
                </Typo>
              </View>
            </View>
            <View className="mt-4 flex-row items-center gap-2">
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Typo className="text-white text-xs font-medium">
                  Easy Setup
                </Typo>
              </View>
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Typo className="text-white text-xs font-medium">
                  Quick Process
                </Typo>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
      </View>

      {showCountdown && (
        <View className="my-4">
          <CountDown
            time={5}
            route={'/screens/(seller)/dashboard/store'}
            message="You will be redirected to your store in"
          />
        </View>
      )}

      <BlurView
        intensity={20}
        tint="light"
        className="rounded-3xl overflow-hidden"
      >
        <View className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/30">
          <AddStoreFormContents control={control} />
          <View className="mt-8">
            <AddStoreFormFooter
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              isLoading={isPending}
              isCreate={isCreate}
            />
          </View>
          {Object.keys(errors).length > 0 && (
            <View className="mt-4">
              <Error errors={errors} />
            </View>
          )}
        </View>
      </BlurView>

      {/* Help Section */}
      <View className="mt-8">
        <BlurView
          intensity={20}
          tint="light"
          className="rounded-3xl overflow-hidden"
        >
          <View className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/30">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="bg-emerald-50 p-2 rounded-full">
                <MaterialIcons name="info" size={20} color="#059669" />
              </View>
              <Typo className="text-gray-800 font-semibold text-lg">
                Need Help?
              </Typo>
            </View>
            <View className="space-y-3 mr-5">
              <View className="flex-row items-start gap-3">
                <MaterialIcons
                  name="check-circle"
                  size={16}
                  color="#059669"
                  style={{ marginTop: 2 }}
                />
                <Typo className="text-gray-600 flex-1">
                  Make sure your store name is unique and easy to remember
                </Typo>
              </View>
              <View className="flex-row items-start gap-3">
                <MaterialIcons
                  name="check-circle"
                  size={16}
                  color="#059669"
                  style={{ marginTop: 2 }}
                />
                <Typo className="text-gray-600 flex-1">
                  Provide a complete and accurate address for better customer
                  reach
                </Typo>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </>
  )
}

export default AddStoreFormCard
