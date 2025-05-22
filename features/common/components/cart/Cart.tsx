import React, { useRef, useEffect, useState } from 'react'
import { View, Animated, ScrollView, RefreshControl } from 'react-native'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import CartHeader from './component/CartHeader'
import CartItem from './component/CartItem'
import CartSummary from './component/CartSummary'
import CartFooter from './component/CartFooter'

// Static cart data
const cartItems = [
  {
    id: '1',
    name: 'Classic Burger',
    price: 120,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    store: 'Burger House',
  },
  {
    id: '2',
    name: 'Chicken Wings',
    price: 150,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    store: 'Wing Stop',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 80,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    store: 'Healthy Bites',
  },
]

const Cart = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const [refreshing, setRefreshing] = useState(false)
  const [items, setItems] = useState(cartItems)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    // Add your refresh logic here
    setTimeout(() => setRefreshing(false), 1000)
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const handleCheckout = () => {
    // Add checkout logic here
    console.log('Checkout clicked')
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const deliveryFee = 50
  const total = subtotal + deliveryFee

  return (
    <ScreenLayout>
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF']}
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1">
        <Animated.View
          className="flex-1"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#10B981"
                title="Pull to refresh"
                titleColor="#10B981"
              />
            }
          >
            <View className="p-4 gap-4">
              <BlurView intensity={10} className="rounded-3xl overflow-hidden">
                <View className="bg-white/90 p-4">
                  <CartHeader totalItems={totalItems} />
                </View>
              </BlurView>

              <BlurView intensity={10} className="rounded-3xl overflow-hidden">
                <View className="bg-white/90 p-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </View>
              </BlurView>

              <BlurView intensity={10} className="rounded-3xl overflow-hidden">
                <CartSummary
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  total={total}
                />
              </BlurView>
            </View>
          </ScrollView>

          <BlurView intensity={20} className="rounded-t-3xl overflow-hidden">
            <View className="bg-white/95 p-4">
              <CartFooter total={total} onCheckout={handleCheckout} />
            </View>
          </BlurView>
        </Animated.View>
      </SafeAreaView>
    </ScreenLayout>
  )
}

export default Cart
