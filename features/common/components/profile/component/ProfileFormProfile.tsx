import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typo from '@/components/common/typo'
import ImageWrapper from '@/components/parts/Image'
import { PERSON_ICON } from '@/constants/image'
import { View, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useAuth } from '@/context/auth'
import { useUpdateProfileImage } from '@/hooks/useMutation/common/useUpdateProfileImage'
import { Ionicons } from '@expo/vector-icons'

interface ProfileFormProfileProps {
  name: string | undefined
  image?: string
}

const ProfileFormProfile = ({ name, image }: ProfileFormProfileProps) => {
  const { user } = useAuth()
  const [profileImage, setProfileImage] = useState<string | null>(image || null)
  const { mutate: updateProfileImage, isPending } = useUpdateProfileImage()

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      })

      if (!result.canceled && result.assets[0].base64 && user?.uid) {
        const base64Image = result.assets[0].base64
        setProfileImage(base64Image)
        updateProfileImage({
          userId: user.uid,
          imageBase64: base64Image,
        })
      }
    } catch (error) {
      console.error('Error picking image:', error)
    }
  }

  return (
    <SafeAreaView className="items-center justify-center my-4">
      <TouchableOpacity
        onPress={pickImage}
        disabled={isPending}
        className="relative"
      >
        <View className="bg-white/30 rounded-full p-1.5 mb-2">
          <View className="overflow-hidden rounded-full">
            <ImageWrapper
              source={
                profileImage
                  ? { uri: `data:image/jpeg;base64,${profileImage}` }
                  : PERSON_ICON
              }
              style={{ height: 120, width: 120 }}
              resizeMode="cover"
            />
          </View>
          <View className="absolute bottom-0 right-0 bg-emerald-500 p-2.5 rounded-full">
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </View>
      </TouchableOpacity>
      <Typo className="text-white text-2xl font-bold mb-1">{name}</Typo>
    </SafeAreaView>
  )
}

export default ProfileFormProfile
