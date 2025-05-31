import { ScrollView, View, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import { useAuth } from '@/context/auth'
import Typo from '@/components/common/typo'
import LoadingIndicator from '@/features/common/components/loadingIndicator/LoadingIndicator'
import { User } from '@/utils/types'
import UsersFormHeader from './UsersFormHeader'
import { useFetchAllUsers } from '@/hooks/useQuery/admin/uers/useFetchAllUsers'
import UsersFormContents from './UsersFormContents'

const UsersFormCard = () => {
  const auth = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data: users,
    isFetching,
    refetch,
  } = useFetchAllUsers({
    id: auth.user?.uid,
  })

  const onRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refetch()
    } catch (error) {
      console.error('Error refreshing users:', error)
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
        <View className="w-full max-w-md bg-white/10 rounded-3xl p-4 shadow-lg border border-white/20 ">
          <UsersFormHeader />
          <View className="h-[calc(100vh-200px)] ">
            <FlashList
              data={users}
              renderItem={({ item }: { item: User }) => (
                <UsersFormContents user={item} />
              )}
              keyExtractor={(item) => item.id}
              estimatedItemSize={100}
              ItemSeparatorComponent={() => <View className="h-2" />}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={() => (
                <View className="flex-1 items-center justify-center p-4">
                  <Typo className="text-gray-200">No users found</Typo>
                </View>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default UsersFormCard
