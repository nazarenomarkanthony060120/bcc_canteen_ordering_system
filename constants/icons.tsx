import React from 'react'
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

export const Icons = {
  dashboard: (props: any) => <AntDesign name="home" size={24} {...props} />,
  profile: (props: any) => <AntDesign name="user" size={24} {...props} />,
  stores: (props: any) => (
    <MaterialIcons name="storefront" size={24} {...props} />
  ),
  cart: (props: any) => <AntDesign name="shoppingcart" size={24} {...props} />,
  members: (props: any) => (
    <MaterialCommunityIcons name="account-group-outline" size={24} {...props} />
  ),
}
