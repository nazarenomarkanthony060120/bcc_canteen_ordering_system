import { ScrollView, View, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { useAuth } from '@/context/auth'
import { useFetchAllMembers } from '@/hooks/useQuery/admin/members/useFetchAllMembers'
import Typo from '@/components/common/typo'
import MembersFormHeader from './MembersFormHeader'
import MemberFormContents from './MemberFormContents'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'

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
      <SafeAreaView className="items-center w-full">
        <View className="w-full max-w-md bg-white/10 rounded-3xl p-4 shadow-lg border border-white/20 mt-4">
          <MembersFormHeader />
          <View className="h-[calc(100vh-200px)] mt-2">
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
                  <Typo className="text-gray-200">No members found</Typo>
                </View>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default MembersFormCard
