import React, { useRef, useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Typo from '@/components/common/typo'
import { BlurView } from 'expo-blur'

const categories = [
  {
    id: '1',
    name: 'All',
    icon: 'restaurant',
    color: '#10B981',
    description: 'All food items',
  },
  {
    id: '2',
    name: 'Vegetable',
    icon: 'grass',
    color: '#059669',
    description: 'Fresh vegetables',
  },
  {
    id: '3',
    name: 'Fruits',
    icon: 'local-grocery-store',
    color: '#F59E0B',
    description: 'Fresh fruits',
  },
  {
    id: '4',
    name: 'Meat',
    icon: 'lunch-dining',
    color: '#DC2626',
    description: 'Fresh meat',
  },
  {
    id: '5',
    name: 'Snacks',
    icon: 'bakery-dining',
    color: '#7C3AED',
    description: 'Quick snacks',
  },
  {
    id: '6',
    name: 'Drinks',
    icon: 'local-drink',
    color: '#3B82F6',
    description: 'Beverages',
  },
  {
    id: '7',
    name: 'Rice',
    icon: 'rice-bowl',
    color: '#F97316',
    description: 'Rice dishes',
  },
  {
    id: '8',
    name: 'Other',
    icon: 'category',
    color: '#6B7280',
    description: 'Other items',
  },
]

interface DashboardCategoriesProps {
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
  onCategoryLongPress?: (category: (typeof categories)[0]) => void
}

const DashboardCategories = ({
  selectedCategory,
  onSelectCategory,
  onCategoryLongPress,
}: DashboardCategoriesProps) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  const handleCategoryPress = (categoryId: string) => {
    onSelectCategory(categoryId)
    const index = categories.findIndex((cat) => cat.id === categoryId)
    if (index !== -1) {
      scrollViewRef.current?.scrollTo({
        x: index * 100,
        animated: true,
      })
    }
  }

  const handleLongPress = (category: (typeof categories)[0]) => {
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

    onCategoryLongPress?.(category)
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
    >
      <BlurView intensity={10} className="rounded-3xl overflow-hidden mb-6">
        <View className="bg-white/90 p-4">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Typo className="text-gray-800 font-semibold">Categories</Typo>
              <Typo className="text-gray-500 text-sm">Browse by category</Typo>
            </View>
            <TouchableOpacity className="bg-emerald-50 px-3 py-1 rounded-full">
              <Typo className="text-emerald-600">See All</Typo>
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`mr-4 items-center ${
                  selectedCategory === category.id
                    ? 'opacity-100'
                    : 'opacity-60'
                }`}
                onPress={() => handleCategoryPress(category.id)}
                onLongPress={() => handleLongPress(category)}
                delayLongPress={200}
              >
                <Animated.View
                  style={{
                    transform: [{ scale: scaleAnim }],
                  }}
                >
                  <View
                    className={`p-4 rounded-2xl mb-2 ${
                      selectedCategory === category.id
                        ? 'bg-opacity-20'
                        : 'bg-opacity-10'
                    }`}
                    style={{
                      backgroundColor: `${category.color}20`,
                    }}
                  >
                    <MaterialIcons
                      name={category.icon as any}
                      size={24}
                      color={category.color}
                    />
                  </View>
                </Animated.View>
                <Typo
                  className={`text-sm font-medium ${
                    selectedCategory === category.id
                      ? 'text-gray-800'
                      : 'text-gray-600'
                  }`}
                >
                  {category.name}
                </Typo>
                {selectedCategory === category.id && (
                  <Typo className="text-xs text-gray-500 mt-1">
                    {category.description}
                  </Typo>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BlurView>
    </Animated.View>
  )
}

export default DashboardCategories
