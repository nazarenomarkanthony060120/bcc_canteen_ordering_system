import { View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import Input from '@/components/common/input'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { FoodType } from '@/utils/types'
import Typo from '@/components/common/typo'
import * as ImagePicker from 'expo-image-picker'
import { BlurView } from 'expo-blur'

interface AddFoodFormContentsProps {
  control: Control<FieldValues>
}

const AddFoodFormContents = ({ control }: AddFoodFormContentsProps) => {
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
        <Typo className="text-gray-700 font-medium mb-2">Food Image</Typo>
        <Controller
          control={control}
          name="image"
          rules={{
            required: 'Food image is required',
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
                      <Ionicons name="fast-food" size={24} color="#059669" />
                    </View>
                    <Typo className="text-gray-600">Tap to add food image</Typo>
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
        <Typo className="text-gray-700 font-medium mb-2">Name</Typo>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 px-4 placeholder:text-gray-400"
              placeholder="Enter name"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              icon={
                <Ionicons name="fast-food-outline" size={20} color="#059669" />
              }
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Price</Typo>
        <Controller
          control={control}
          name="price"
          rules={{ required: 'Price is required' }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 px-4 placeholder:text-gray-400"
              placeholder="Enter price"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              keyboardType="numeric"
              icon={
                <MaterialCommunityIcons
                  name="currency-php"
                  size={20}
                  color="#059669"
                />
              }
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Quantity</Typo>
        <Controller
          control={control}
          name="quantity"
          rules={{ required: 'Quantity is required' }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 px-4 placeholder:text-gray-400"
              placeholder="Enter quantity"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              keyboardType="numeric"
              icon={<MaterialIcons name="numbers" size={20} color="#059669" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Food Type</Typo>
        <Controller
          control={control}
          name="type"
          rules={{
            required: 'Food Type is required',
            validate: (value) =>
              [
                FoodType.DRINKS,
                FoodType.FRUITS,
                FoodType.MEAT,
                FoodType.SNACKS,
                FoodType.VEGETABLE,
                FoodType.RICE,
                FoodType.OTHER,
              ].includes(value.trim())
                ? true
                : 'Type must be one of: Rice, Drink, Fruits, Meat, Snacks, Vegetable, Other',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 px-4 placeholder:text-gray-400"
              placeholder="ex: [ Drinks, Fruits, Meat, Snacks, Vegetables, Others ]"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              multiline={true}
              numberOfLines={4}
              icon={<MaterialIcons name="category" size={20} color="#059669" />}
            />
          )}
        />
      </View>

      <View>
        <Typo className="text-gray-700 font-medium mb-2">Description</Typo>
        <Controller
          control={control}
          name="description"
          rules={{ required: 'Description is required' }}
          render={({ field: { onChange, value } }) => (
            <Input
              className="w-full py-3 px-4 placeholder:text-gray-400"
              placeholder="Enter food description"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              isIconLeft
              multiline={true}
              numberOfLines={4}
              icon={
                <MaterialIcons name="description" size={20} color="#059669" />
              }
            />
          )}
        />
      </View>
    </View>
  )
}

export default AddFoodFormContents
