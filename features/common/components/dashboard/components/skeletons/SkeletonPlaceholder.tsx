import React, { useEffect, useRef } from 'react'
import { View, Animated } from 'react-native'

interface SkeletonPlaceholderProps {
  width?: number | string
  height: number
  borderRadius?: number
  style?: any
}

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({
  width = '100%',
  height,
  borderRadius = 8,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    )
    shimmerLoop.start()

    return () => shimmerLoop.stop()
  }, [])

  const animatedOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  })

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#E5E7EB',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#F3F4F6',
          opacity: animatedOpacity,
        }}
      />
    </View>
  )
}

export default SkeletonPlaceholder

