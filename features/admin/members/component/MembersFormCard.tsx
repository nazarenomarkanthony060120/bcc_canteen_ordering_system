import { ActivityIndicator, ScrollView, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import MemberFormContents from './MemberFormContents'
import { useAuth } from '@/context/auth'
import MembersFormHeader from './MembersFormHeader'
import { useFetchAllMembers } from '@/hooks/useQuery/admin/members/useFetchAllMembers'

const MembersFormCard = () => {
  const auth = useAuth()
  const { data: members, isFetching } = useFetchAllMembers({
    id: auth.user?.uid,
  })

  if (isFetching)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-4 p-5">
        <MembersFormHeader />
        <FlashList
          data={members}
          renderItem={({ item }) => <MemberFormContents user={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View className="h-2" />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ScrollView>
  )
}

export default MembersFormCard
