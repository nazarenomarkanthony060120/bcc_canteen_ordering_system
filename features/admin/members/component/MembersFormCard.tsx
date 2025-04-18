import { ActivityIndicator, ScrollView, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFetchAllMembers } from '@/hooks/admin/members/useFetchAllMembers'
import { FlashList } from '@shopify/flash-list'
import MemberFormContents from './MemberFormContents'
import { useAuth } from '@/context/auth'
import MembersFormHeader from './MembersFormHeader'

const MembersFormCard = () => {
  const auth = useAuth()
  const { data: members, isFetching } = useFetchAllMembers({
    id: auth.user?.uid,
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-4 p-5">
        <MembersFormHeader />
        {isFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlashList
            data={members}
            renderItem={({ item }) => <MemberFormContents user={item} />}
            keyExtractor={(item) => item.id}
            estimatedItemSize={100}
            ItemSeparatorComponent={() => <View className="h-2" />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

export default MembersFormCard
