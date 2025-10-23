import { SafeAreaView, View, Image, Animated, Text } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { MaterialIcons } from '@expo/vector-icons'
import { Store } from '@/utils/types'
import { getStoreStatusColor } from '@/features/common/parts/getStoreStatusColor'
import { useGetUserByUserId } from '@/hooks/useQuery/common/get/useGetUserByUserId'

interface MyStoreFormHeaderProps {
  store: Store | undefined | null
}

const MyStoreFormHeader = ({ store }: MyStoreFormHeaderProps) => {
  const { data: userData } = useGetUserByUserId({id: store?.userId})
  const status = getStoreStatusColor(store?.status || 0)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const textFadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <SafeAreaView className="items-center justify-center gap-4 p-5 mt-5">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        }}
        className="w-full"
      >
        <BlurView
          intensity={25}
          tint="light"
          className="w-full rounded-3xl overflow-hidden"
        >
          <LinearGradient
            colors={['#ffffff', '#f8fafc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-1"
          >
            <View className="bg-white rounded-2xl overflow-hidden">
              <View className="aspect-video w-full">
                <Image
                  source={{ uri: `data:image/jpeg;base64,${store?.image}` }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <Animated.View
                style={{
                  opacity: textFadeAnim,
                  transform: [
                    {
                      translateY: textFadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                  ],
                }}
                className="p-6"
              >
                <View className="mb-6">
                  <Text className="text-gray-500 text-sm font-medium tracking-wide uppercase mb-2">
                    Store Details
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-800 text-3xl font-bold tracking-tight flex-1 mr-4">
                      {store?.store}
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: status.borderColor,
                        borderRadius: 12,
                        backgroundColor: status.bgColor,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        alignSelf: 'flex-start',
                        marginBottom: 12,
                      }}
                    >
                      <View className="flex-row items-center">
                        <MaterialIcons
                          name={status.icon}
                          size={14}
                          color={status.textColor}
                        />
                        <Text
                          className="ml-1 text-[10px] font-bold"
                          style={{ color: status.textColor }}
                        >
                          {status.text}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="space-y-4 gap-3">
                  <View className="flex-row items-start gap-3">
                    <View className="bg-gray-50 p-2.5 rounded-lg mt-1">
                      <MaterialIcons
                        name="contact-phone"
                        size={22}
                        color="#10B981"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-500 text-sm font-medium mb-1">
                        Contact Number
                      </Text>
                      <Text className="text-gray-800 text-base leading-5">
                        {userData?.phoneNumber}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-start gap-3">
                    <View className="bg-gray-50 p-2.5 rounded-lg mt-1">
                      <MaterialIcons
                        name="schedule"
                        size={22}
                        color="#10B981"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-500 text-sm font-medium mb-1">
                        Operating Hours
                      </Text>
                      <Text className="text-gray-800 text-base leading-5">
                        Mon - Fri, 8:00 AM - 5:00 PM
                      </Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
            </View>
          </LinearGradient>
        </BlurView>
      </Animated.View>
    </SafeAreaView>
  )
}

export default MyStoreFormHeader
