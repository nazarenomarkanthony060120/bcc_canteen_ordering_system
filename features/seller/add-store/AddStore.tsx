import { View, Text } from 'react-native'
import React from 'react'
import Seller from '../Seller'
import AddStoreHeader from './component/AddStoreHeader'

const AddStore = () => {
  return (
    <Seller className="px-5">
      <AddStoreHeader />
    </Seller>
  )
}

export default AddStore
