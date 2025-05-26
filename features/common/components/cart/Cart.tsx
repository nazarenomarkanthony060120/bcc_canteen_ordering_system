import React, { useRef, useEffect, useState } from 'react'
import { View, Animated, ScrollView, RefreshControl, Alert } from 'react-native'
import ScreenLayout from '../screenLayout/ScreenLayout'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import CartHeader from './component/CartHeader'
import CartItem from './component/CartItem'
import CartSummary from './component/CartSummary'
import CartFooter from './component/CartFooter'
import PaymentMethodModal from './component/PaymentMethodModal'
import { useAuth } from '@/context/auth'
import { useFetchCartByUserId } from '@/hooks/useQuery/common/fetch/useFetchCartByUserId'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { useGetFoodByFoodId } from '@/hooks/useQuery/common/get/useGetFoodByFoodId'
import { useGetStoreByStoreId } from '@/hooks/useQuery/common/get/useGetStoreByStoreId'
import { useUpdateCartQuantity } from '@/hooks/useMutation/common/useUpdateCartQuantity'
import { useDeleteCart } from '@/hooks/useMutation/common/useDeleteCart'
import { useSaveReservedOrder } from '@/hooks/useMutation/common/useSaveReservedOrder'
import { Cart as CartType } from '@/utils/types'

const Cart = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(20)).current
  const [refreshing, setRefreshing] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isReserving, setIsReserving] = useState(false)
  const auth = useAuth()

  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useFetchCartByUserId({
    id: auth.user?.uid,
  })
  const { mutate: updateQuantity } = useUpdateCartQuantity()
  const { mutate: deleteCartItem } = useDeleteCart()
  const { mutate: saveReservedOrder } = useSaveReservedOrder()

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
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }

  const handleQuantityChange = (
    id: string,
    newQuantity: number,
    foodPrice: number,
  ) => {
    if (newQuantity < 0) return

    if (newQuantity === 0) {
      deleteCartItem(id)
      return
    }

    const totalPrice = newQuantity * foodPrice
    updateQuantity({ id, quantity: newQuantity, totalPrice })
  }

  const handleCheckout = () => {
    if (!auth.user) {
      Alert.alert('Login Required', 'Please login to proceed with checkout')
      return
    }

    if (!cartItems?.length) {
      Alert.alert('Empty Cart', 'Your cart is empty')
      return
    }

    setShowPaymentModal(true)
  }

  const handlePaymentSelection = (method: 'GCash' | 'Cash') => {
    setShowPaymentModal(false)
    if (method === 'GCash') {
      Alert.alert(
        'GCash Payment Coming Soon',
        'We are currently working on integrating GCash payments. For now, please use cash payment at the counter.',
        [{ text: 'OK' }],
      )
    } else {
      setIsReserving(true)
      // Save the order to reserved collection
      saveReservedOrder(
        {
          userId: auth.user?.uid || '',
          cartItems: cartItems || [],
          totalAmount: total,
          paymentMethod: method,
        },
        {
          onSuccess: () => {
            // Delete all cart items after successful reservation
            const deletePromises =
              cartItems?.map((item) => deleteCartItem(item.id)) || []
            Promise.all(deletePromises)
              .then(() => {
                setIsReserving(false)
                Alert.alert(
                  'Order Reserved Successfully!',
                  'Your order has been reserved and is being prepared. Please proceed to the counter to pay in cash and collect your order. Thank you for your order!',
                  [{ text: 'OK' }],
                )
              })
              .catch((error) => {
                console.error('Error clearing cart:', error)
                setIsReserving(false)
                Alert.alert(
                  'Warning',
                  'Your order was reserved but there was an error clearing your cart. Please try clearing it manually.',
                  [{ text: 'OK' }],
                )
              })
          },
          onError: (error) => {
            setIsReserving(false)
            Alert.alert(
              'Error',
              'There was an error reserving your order. Please try again.',
              [{ text: 'OK' }],
            )
            console.error('Error saving reserved order:', error)
          },
        },
      )
    }
  }

  if (isLoading && !refreshing) return <LoadingIndicator />
  if (isReserving) return <LoadingIndicator />

  const totalItems =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0
  const subtotal =
    cartItems?.reduce((sum, item) => sum + item.totalPrice, 0) || 0
  const total = subtotal

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
                  {cartItems?.map((item) => (
                    <CartItemWithFood
                      key={item.id}
                      cartItem={item}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </View>
              </BlurView>

              <BlurView intensity={10} className="rounded-3xl overflow-hidden">
                <CartSummary subtotal={subtotal} total={total} />
              </BlurView>
            </View>
          </ScrollView>

          <BlurView intensity={10} className="rounded-t-3xl overflow-hidden">
            <View className="bg-white/95 p-4">
              <CartFooter total={total} onCheckout={handleCheckout} />
            </View>
          </BlurView>
        </Animated.View>
      </SafeAreaView>

      <PaymentMethodModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelectPayment={handlePaymentSelection}
        total={total}
      />
    </ScreenLayout>
  )
}

// Component to fetch and display food details for each cart item
const CartItemWithFood = ({
  cartItem,
  onQuantityChange,
}: {
  cartItem: CartType
  onQuantityChange: (id: string, quantity: number, foodPrice: number) => void
}) => {
  const { data: food } = useGetFoodByFoodId({ id: cartItem.foodId })
  const { data: store } = useGetStoreByStoreId({ id: food?.storeId })

  if (!food || !store) return null

  return (
    <CartItem
      id={cartItem.id}
      name={food.name}
      price={food.price}
      quantity={cartItem.quantity}
      image={cartItem.image}
      store={store.store}
      onQuantityChange={(id, quantity) =>
        onQuantityChange(id, quantity, food.price)
      }
    />
  )
}

export default Cart
