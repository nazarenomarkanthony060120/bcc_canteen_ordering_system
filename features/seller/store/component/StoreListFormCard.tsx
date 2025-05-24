import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list'
import { Store, User } from '@/utils/types'
import StoreFormContents from './StoreFormContents'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'

interface Props {
  stores: Store[]
  user: User | null | undefined
}

const StoreListFormCard = ({ stores, user }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const renderEmptyList = () => (
    <View className="flex-1 items-center justify-center px-6 py-12">
      <View
        className="bg-emerald-50/80 p-6 rounded-2xl mb-6 w-full max-w-[280px] items-center"
        style={{
          elevation: 8,
        }}
      >
        <View
          className="bg-white/80 p-4 rounded-full mb-4"
          style={{
            elevation: 4,
          }}
        >
          <MaterialIcons name="store" size={40} color="#10B981" />
        </View>
        <Typo className="text-gray-800 text-xl font-bold mb-2 text-center">
          No Stores Found
        </Typo>
        <Typo className="text-gray-500 text-center text-base leading-6">
          You haven't created any stores yet.{'\n'}Start by adding your first
          store.
        </Typo>
      </View>
    </View>
  )

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        elevation: 8,
      }}
      className="flex-1"
    >
      <BlurView intensity={25} tint="light" className="flex-1">
        <LinearGradient
          colors={['#ffffff', '#f8fafc', '#f1f5f9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1"
        >
          <MasonryFlashList
            data={stores}
            renderItem={({ item }) => (
              <StoreFormContents store={item} user={user} />
            )}
            estimatedItemSize={200}
            numColumns={1}
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyList}
            ItemSeparatorComponent={() => <View className="h-2" />}
            overScrollMode="never"
          />
        </LinearGradient>
      </BlurView>
    </Animated.View>
  )
}

export default StoreListFormCard
