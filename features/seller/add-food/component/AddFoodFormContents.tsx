import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import Input from '@/components/common/input'
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

interface AddFoodFormContentsProps {
  control: Control<FieldValues>
}

const AddFoodFormContents = ({ control }: AddFoodFormContentsProps) => {
  return (
    <View className="gap-2 pt-11">
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Food Name is required',
          minLength: {
            value: 3,
            message: 'Food Name must be at least 3 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Food Name'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={
              <Ionicons name={'fast-food-outline'} size={20} color="#02bf15" />
            }
          />
        )}
      />
      <Controller
        control={control}
        name="price"
        rules={{ required: 'Price is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Price'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={
              <MaterialCommunityIcons
                name={'currency-php'}
                size={20}
                color="#02bf15"
              />
            }
          />
        )}
      />
      <Controller
        control={control}
        name="quantity"
        rules={{ required: 'Quantity is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Quantity'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<MaterialIcons name={'numbers'} size={20} color="#02bf15" />}
          />
        )}
      />
      <Controller
        control={control}
        name="category"
        rules={{ required: 'Category is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={'w-full py-3  placeholder:text-slate-400 '}
            placeholder={'Category'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            icon={<MaterialIcons name={'category'} size={20} color="#02bf15" />}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        rules={{ required: 'Description is required' }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={
              'w-full py-3 items-start justify-start placeholder:text-slate-400 '
            }
            placeholder={'Description'}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            isIconLeft
            multiline={true}
            numberOfLines={4}
            icon={
              <MaterialIcons name={'description'} size={20} color="#02bf15" />
            }
          />
        )}
      />
    </View>
  )
}

export default AddFoodFormContents
