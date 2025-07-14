import { View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Control, Controller, FieldValues, useForm } from 'react-hook-form'
import Input from '@/components/common/input'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import * as ImagePicker from 'expo-image-picker'
import { BlurView } from 'expo-blur'

interface StoreFormData {
  store: string
  address: string
  image: string
}

interface AddStoreFormContentsProps {
  control: Control<FieldValues>
}

const AddStoreFormContents = ({ control }: AddStoreFormContentsProps) => {
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
        base64: true,
      })

      if (!result.canceled && result.assets[0].base64) {
        const base64Image = result.assets[0].base64
        setImage(base64Image)
        control._formValues.image = base64Image
      }
    } catch (error) {
      console.error('Error picking image:', error)
    }
  }

  return (
    <View className="gap-6">
      <View>
        <Typo className="text-gray-700 font-medium mb-2">Store Image</Typo>
        <Controller
          control={control}
          name="image"
          rules={{
            required: 'Store image is required',
          }}
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              onPress={pickImage}
              className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100"
            >
              {image ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${image}` }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <BlurView
                  intensity={20}
                  tint="light"
                  className="w-full h-full items-center justify-center"
                >
                  <View className="items-center gap-2">
                    <View className="bg-emerald-100 p-3 rounded-full">
                      <Ionicons name="image" size={24} color="#059669" />
                    </View>
                    <Typo className="text-gray-600">
                      Tap to add store image
                    </Typo>
                    <Typo className="text-gray-400 text-xs">
                      Recommended: 16:9 ratio
                    </Typo>
                  </View>
                </BlurView>
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Store Name</Typo>
        <Controller
          control={control}
          name="store"
          rules={{
            required: 'Store name is required',
            minLength: {
              value: 5,
              message: 'Store name must be at least 5 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9\s-]+$/,
              message:
                'Store name can only contain letters, numbers, spaces, and hyphens',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full uppercase py-3 px-4 placeholder:text-gray-400"
              placeholder="Enter your store name"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<FontAwesome5 name="store" size={20} color="#059669" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Store Address</Typo>
        <Controller
          control={control}
          name="address"
          rules={{
            required: 'Store address is required',
            minLength: {
              value: 10,
              message: 'Address must be at least 10 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full uppercase py-3 px-4 placeholder:text-gray-400"
              placeholder="Enter your store's complete address"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={<Entypo name="location" size={20} color="#059669" />}
            />
          )}
        />
      </View>
    </View>
  )
}

export default AddStoreFormContents
