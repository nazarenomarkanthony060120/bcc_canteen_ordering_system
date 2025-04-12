import { Text } from 'react-native'
import React from 'react'
import Seller from '../Seller'
import ViewStore from './component/ViewStore'

const Store = () => {
  const store = false
  return (
    <Seller className="flex-1 bg-slate-200 items-center justify-between">
      {!store ? <ViewStore /> : <Text>You had Store</Text>}
    </Seller>
  )
}

export default Store
