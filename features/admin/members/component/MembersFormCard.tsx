import { ScrollView, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import MemberFormContents from './MemberFormContents'
import { useAuth } from '@/context/auth'
import MembersFormHeader from './MembersFormHeader'
import { useFetchAllMembers } from '@/hooks/useQuery/admin/members/useFetchAllMembers'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

const MembersFormCard = () => {
  const auth = useAuth()
  const { data: members, isFetching } = useFetchAllMembers({
    id: auth.user?.uid,
  })

  if (isFetching) return <LoadingIndicator />

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-4  mb-20">
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
