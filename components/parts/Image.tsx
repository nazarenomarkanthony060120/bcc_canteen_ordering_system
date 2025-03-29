import { View, Text, Image, ImageSourcePropType, ImageStyle, RecursiveArray, Falsy, RegisteredStyle } from 'react-native'
import React, { CSSProperties } from 'react'

interface ImageWrapperProps {
  source: ImageSourcePropType | undefined
  style: ImageStyle | RecursiveArray<Falsy | ImageStyle | RegisteredStyle<ImageStyle>>
  resizeMode: string
}

const ImageWrapper = ({ source, style, resizeMode }: ImageWrapperProps) => {
  return (
    <View>
      <Image 
        source={source} 
        style={style} 
        resizeMode="cover" 
      />
    </View>
  )
}

export default ImageWrapper