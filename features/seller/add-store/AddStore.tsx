import React from 'react'
import Seller from '../Seller'
import AddStoreHeader from './component/AddStoreHeader'
import AddStoreFormCard from './component/AddStoreFormCard'

const AddStore = () => {
  return (
    <Seller className="flex-1 bg-[#ccffcc] px-5">
      <AddStoreHeader />
      <AddStoreFormCard />
    </Seller>
  )
}

export default AddStore
