import { Pressable, View, Animated, Image } from 'react-native'
import React, { useRef } from 'react'
import { useRouter } from 'expo-router'
import ImageWrapper from '@/components/parts/Image'
import { CANTEEN_IMAGE } from '@/constants/image'
import Typo from '@/components/common/typo'
import { BlurView } from 'expo-blur'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Store } from '@/utils/types'

interface CategoryListProps {
  store: Store
}

const CategoryList = ({ store }: CategoryListProps) => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(1)).current

  const navigateToViewStore = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start()

    router.push(`/screens/common/viewStore?storeId=${store.id}`)
  }

  return (
    <Pressable key={store.id} onPress={navigateToViewStore} className="mr-4">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <BlurView intensity={10} className="rounded-2xl overflow-hidden">
          <View className="bg-white/90">
            <View className="relative">
              <View className="overflow-hidden rounded-xl">
                <ImageWrapper
                  source={
                    store.image
                      ? { uri: `data:image/jpeg;base64,${store.image}` }
                      : CANTEEN_IMAGE
                  }
                  style={{ height: 140, width: '100%' }}
                />
              </View>
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                className="absolute bottom-0 left-0 right-0 h-20 rounded-b-2xl"
              />
              <View className="absolute bottom-3 left-3 right-3">
                <View className="flex-row items-center justify-between">
                  <View className="bg-emerald-500 px-3 py-1.5 rounded-full">
                    <Typo className="text-white text-sm font-medium">
                      Featured Store
                    </Typo>
                  </View>
                </View>
              </View>
            </View>
            <View className="p-4">
              <View className="flex-row items-start gap-3 mb-3">
                <View className="bg-emerald-50 p-2 rounded-full mt-1">
                  <MaterialIcons name="store" size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Typo className="text-gray-800 font-semibold text-lg mb-1">
                    {store.store}
                  </Typo>
                  {store.stall && (
                    <View className="flex-row items-center">
                      <MaterialIcons name="store" size={14} color="#6B7280" />
                      <Typo className="text-gray-500 text-sm ml-1 flex-1">
                        Stall #:{store.stall}
                      </Typo>
                    </View>
                  )}
                  {store.address && (
                    <View className="flex-row items-center">
                      <MaterialIcons
                        name="location-on"
                        size={14}
                        color="#6B7280"
                      />
                      <Typo className="text-gray-500 text-sm ml-1 flex-1">
                        {store.address}
                      </Typo>
                    </View>
                  )}
                </View>
              </View>
              <View className="flex-row items-center justify-between gap-5">
                <View className="flex-row items-center">
                  <View className="bg-emerald-50 px-2 py-1 rounded-full">
                    <View className="flex-row items-center">
                      <MaterialIcons
                        name="schedule"
                        size={14}
                        color="#10B981"
                      />
                      <Typo className="text-emerald-600 text-xs ml-1">
                        Open Now
                      </Typo>
                    </View>
                  </View>
                </View>
                <View className="bg-emerald-500 px-4 py-2 rounded-full">
                  <Typo className="text-white text-sm font-medium">
                    View Menu
                  </Typo>
                </View>
              </View>
            </View>
          </View>
        </BlurView>
      </Animated.View>
    </Pressable>
  )
}

export default CategoryList
