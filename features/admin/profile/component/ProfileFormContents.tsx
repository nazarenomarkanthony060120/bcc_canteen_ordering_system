import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/utils/types'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Timestamp } from 'firebase/firestore'
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
import { createdAtFormatted } from '@/features/common/parts/getCreatedAtFormatted'
import Input from '@/components/common/input'
import { getUserStatus } from '@/features/common/parts/getUserStatus'

interface ProfileFormContentsProps {
  user: User | undefined
}
const ProfileFormContents = ({ user }: ProfileFormContentsProps) => {
  const renderUser = (item: User) => (
    <SafeAreaView className="flex-1 mt-4">
      <View className="items-center">
        <Text className="text-2xl text-slate-100 font-bold">{item.name}</Text>
      </View>
      <View className="mt-5 gap-3">
        <Input
          className={'w-full py-3'}
          placeholder={'Email'}
          value={item.email}
          secureTextEntry={false}
          isIconLeft
          editable={false}
          icon={
            <MaterialIcons name={'alternate-email'} size={20} color="#02bf15" />
          }
        />
        <Input
          className={'w-full py-3'}
          placeholder={'User Type'}
          value={item.type}
          secureTextEntry={false}
          isIconLeft
          editable={false}
          icon={<MaterialIcons name={'category'} size={20} color="#02bf15" />}
        />
        <Input
          className={'w-full py-3'}
          placeholder={'User Status'}
          value={getUserStatus(Number(item.status))}
          secureTextEntry={false}
          isIconLeft
          editable={false}
          icon={<AntDesign name={'infocirlceo'} size={20} color="#02bf15" />}
        />
        <Input
          className={'w-full py-3'}
          placeholder={'Create Date'}
          value={createdAtFormatted(item.createdAt as unknown as Timestamp)}
          secureTextEntry={false}
          isIconLeft
          editable={false}
          icon={<Ionicons name={'create-outline'} size={20} color="#02bf15" />}
        />
      </View>
    </SafeAreaView>
  )

  return (
    <FlashList
      data={user ? [user] : []}
      renderItem={({ item }) => renderUser(item)}
      keyExtractor={(item) => item.id}
      estimatedItemSize={100}
    />
  )
}

export default ProfileFormContents
