import React from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

export const Icons = {
  dashboard: (props: any) => <AntDesign name="home" size={24} {...props} />,
  profile: (props: any) => <AntDesign name="user" size={24} {...props} />,
  store: (props: any) => (
    <MaterialIcons name="storefront" size={24} {...props} />
  ),
  cart: (props: any) => <AntDesign name="shoppingcart" size={24} {...props} />,
}
