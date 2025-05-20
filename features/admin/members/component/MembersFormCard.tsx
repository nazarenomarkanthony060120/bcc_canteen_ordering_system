import { ScrollView, View, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { useAuth } from '@/context/auth'
import { useFetchAllMembers } from '@/hooks/useQuery/admin/members/useFetchAllMembers'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import Typo from '@/components/common/typo'
import MembersFormHeader from './MembersFormHeader'
import MemberFormContents from './MemberFormContents'

const MembersFormCard = () => {
  const auth = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data: members,
    isFetching,
    refetch,
  } = useFetchAllMembers({
    id: auth.user?.uid,
  })

  const onRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refetch()
    } catch (error) {
      console.error('Error refreshing members:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isFetching && !isRefreshing) return <LoadingIndicator />

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView className="gap-4 mb-20">
        <MembersFormHeader />
        <View className="h-[calc(100vh-200px)]">
          <FlashList
            data={members}
            renderItem={({ item }) => <MemberFormContents user={item} />}
            keyExtractor={(item) => item.id}
            estimatedItemSize={100}
            ItemSeparatorComponent={() => <View className="h-2" />}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center p-4">
                <Typo className="text-gray-500">No members found</Typo>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default MembersFormCard
